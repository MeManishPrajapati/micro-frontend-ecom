import React from 'react';
import { createRoot } from 'react-dom/client';
import Listing from './Listing';

function App() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
			<header style={{ marginBottom: 20 }}>
				<h1 style={{ margin: 0 }}>Product Listing MFE</h1>
			</header>

			{/* Pass header prop in case Listing expects it; Listing will also render below */}
			<main>
				<Listing />
			</main>
		</div>
	);
}
createRoot(document.getElementById('root')).render(<App />);
