import React, { useEffect, useState } from 'react';

/**
 * Details.jsx
 * Simple product details component that fetches from a public open API (fakestoreapi.com).
 *
 * Usage:
 * <Details productId={3} />
 * or navigate to /somepath?id=3 and omit the prop to pick id from query string.
 */

export default function Details({ productId: initialId }) {
	const getIdFromQuery = () => {
		try {
			const params = new URLSearchParams(window.location.search);
			return params.get('id');
		} catch {
			return null;
		}
	};

	const [productId, setProductId] = useState(
		initialId || getIdFromQuery() || '1'
	);
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [reloadKey, setReloadKey] = useState(0);

	useEffect(() => {
		if (!productId) return;
		const controller = new AbortController();
		const signal = controller.signal;

		async function fetchProduct() {
			setLoading(true);
			setError(null);
			setProduct(null);
			try {
				// Using a public open API for demo purposes
				const res = await fetch(
					`https://fakestoreapi.com/products/${encodeURIComponent(productId)}`,
					{ signal }
				);
				if (!res.ok) {
					throw new Error(`API error: ${res.status} ${res.statusText}`);
				}
				const data = await res.json();
				// FakeStore returns an object for valid ids, or an error for invalid ones
				setProduct(data);
			} catch (err) {
				if (err.name !== 'AbortError')
					setError(err.message || 'Failed to load product');
			} finally {
				setLoading(false);
			}
		}

		fetchProduct();
		return () => controller.abort();
	}, [productId, reloadKey]);

	const onChangeId = (e) => setProductId(e.target.value);
	const retry = () => setReloadKey((k) => k + 1);

    const styles = {
        header: {
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
        },
    };

    return (
        <div
            style={{
                maxWidth: 800,
                margin: '16px auto',
                fontFamily: 'system-ui, Arial',
            }}
        >
            <header style={styles.header}>
                <h2 style={{ margin: 0 }}>Products Details</h2>
            </header>
            <div style={{ marginBottom: 12 }}>
                <label style={{ marginRight: 8 }}>Product ID:</label>
                <input
                    value={productId}
                    onChange={onChangeId}
                    style={{ width: 80, marginRight: 8 }}
                />
                <button onClick={() => retry()}>Load</button>
            </div>

            {loading && <div>Loading product #{productId}…</div>}

            {error && (
                <div style={{ color: 'crimson' }}>
                    <div>Error: {error}</div>
                    <button onClick={retry} style={{ marginTop: 8 }}>
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && product && (
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            width: 200,
                            height: 200,
                            objectFit: 'contain',
                            border: '1px solid #eee',
                            padding: 8,
                        }}
                    />
                    <div>
                        <h2 style={{ margin: '0 0 8px' }}>{product.title}</h2>
                        <div style={{ marginBottom: 8, fontWeight: '600' }}>${product.price}</div>
                        <div style={{ marginBottom: 8, color: '#555' }}>{product.category}</div>
                        <p style={{ marginTop: 0 }}>{product.description}</p>
                        {product.rating && (
                            <div style={{ marginTop: 8, color: '#333' }}>
                                Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!loading && !error && !product && (
                <div>
                    No product loaded. Enter an ID (1-20 for fakestoreapi) and click Load.
                </div>
            )}
        </div>
    );
}
