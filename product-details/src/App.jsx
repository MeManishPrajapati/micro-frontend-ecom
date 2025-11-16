import React from 'react';
import { createRoot } from 'react-dom/client';
import Details from './Details';

function App() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
			<header style={{ marginBottom: 20 }}>
				<h1 style={{ margin: 0 }}>Product Details MFE</h1>
			</header>

			<main>
				<Details />
			</main>
		</div>
	);
}

createRoot(document.getElementById('root')).render(<App />);
