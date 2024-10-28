import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState({});
    const [logisticsProviders, setLogisticsProviders] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const productsPerPage = 10; // Number of products per page

    // Fetch products from CSV
    const fetchProducts = async () => {
        try {
            const response = await fetch('/products.csv');
            const text = await response.text();
            const parsedData = parseCSV(text);
            setProducts(parsedData);
        } catch (error) {
            console.error("Error fetching product data:", error);
            setError('Error fetching product data.');
        }
    };

    // Fetch stock data from CSV
    const fetchStock = async () => {
        try {
            const response = await fetch('/stock.csv');
            const text = await response.text();
            const parsedStock = parseStockCSV(text);
            setStock(parsedStock);
        } catch (error) {
            console.error("Error fetching stock data:", error);
            setError('Error fetching stock data.');
        }
    };

    // Fetch logistics provider data from CSV
    const fetchLogisticsProviders = async () => {
        try {
            const response = await fetch('/pincodes.csv');
            const text = await response.text();
            const parsedProviders = parsePincodesCSV(text);
            setLogisticsProviders(parsedProviders);
        } catch (error) {
            console.error("Error fetching logistics data:", error);
            setError('Error fetching logistics data.');
        }
    };

    // Parsing functions
    const parseCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(header => header.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index] || ''; // Handle undefined
                return obj;
            }, {});
        });
    };

    const parseStockCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const stockData = {};
        lines.slice(1).forEach(line => {
            const [productId, stockAvailable] = line.split(',').map(value => value.trim());
            stockData[productId] = stockAvailable === 'True';
        });
        return stockData;
    };

    const parsePincodesCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const providerData = {};
        lines.slice(1).forEach(line => {
            const [pincode, provider, tat] = line.split(',').map(value => value.trim());
            providerData[pincode] = { provider, tat: parseInt(tat, 10) };
        });
        return providerData;
    };

    useEffect(() => {
        fetchProducts();
        fetchStock();
        fetchLogisticsProviders();
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Slice products for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Page navigation handler
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="product-list">
            <h1>Product List</h1>
            {currentProducts.length === 0 ? (
                <p>No products available.</p>
            ) : (
                currentProducts.map(product => (
                    <ProductItem 
                        key={product['Product ID']}
                        product={product}
                        inStock={stock[product['Product ID']] || false}
                        logisticsProviders={logisticsProviders}
                    />
                ))
            )}
            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
