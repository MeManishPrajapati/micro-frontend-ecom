import React, { useEffect, useState, useMemo } from "react";

/*
    Listing.jsx
    - Fetches a product list from a public Open API (fakestoreapi.com).
    - Displays loading / error states and a simple search filter.
    - Replace API_URL with your preferred endpoint (e.g. example.com/your-products).
*/

const API_URL = "https://fakestoreapi.com/products";

export default function Listing() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ctrl = new AbortController();
        setLoading(true);
        setError(null);

        fetch(API_URL, { signal: ctrl.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                // ensure array
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => setLoading(false));

        return () => ctrl.abort();
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter(
            (p) =>
                (p.title && p.title.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q))
        );
    }, [products, query]);

    if (loading) {
        return (
            <div style={styles.container}>
                <p>Loading products…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <p style={{ color: "crimson" }}>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2 style={{ margin: 0 }}>Products</h2>
                <input
                    type="search"
                    placeholder="Search by title, description or category"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.search}
                    aria-label="Search products"
                />
            </header>

            <p style={{ marginTop: 8 }}>
                Showing {filtered.length} of {products.length}
            </p>

            <div style={styles.grid}>
                {filtered.map((p) => (
                    <a
                        key={p.id}
                        href={`/details?id=${encodeURIComponent(p.id)}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        aria-label={`View details for ${p.title}`}
                    >
                        <article style={styles.card}>
                            <img
                                src={p.image}
                                alt={p.title}
                                style={styles.image}
                                loading="lazy"
                            />
                            <div style={styles.cardBody}>
                                <h3 style={styles.title}>{p.title}</h3>
                                <p style={styles.category}>{p.category}</p>
                                <p style={styles.price}>${p.price}</p>
                                <p style={styles.desc}>
                                    {p.description.length > 120
                                        ? p.description.slice(0, 120) + "…"
                                        : p.description}
                                </p>
                            </div>
                        </article>
                    </a>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: 16,
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        color: "#222",
        maxWidth: 1100,
        margin: "0 auto",
    },
    header: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    search: {
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
        minWidth: 280,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
        marginTop: 12,
    },
    card: {
        border: "1px solid #e6e6e6",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        height: "100%",
        cursor: "pointer", // make it obvious the card is clickable
    },
    image: {
        width: "100%",
        height: 180,
        objectFit: "contain",
        background: "#fafafa",
    },
    cardBody: {
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flex: "1 1 auto",
    },
    title: {
        fontSize: 14,
        margin: 0,
        lineHeight: 1.2,
    },
    category: {
        fontSize: 12,
        color: "#666",
        margin: 0,
    },
    price: {
        fontWeight: 700,
        margin: 0,
    },
    desc: {
        fontSize: 13,
        color: "#444",
        marginTop: 4,
        flex: "1 1 auto",
    },
};