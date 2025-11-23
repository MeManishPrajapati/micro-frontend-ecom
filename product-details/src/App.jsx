import React from 'react';
import { createRoot } from 'react-dom/client';
import Details from './Details';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
				<header style={{ marginBottom: 20 }}>
					<h1 style={{ margin: 0 }}>Product Details Standalone App</h1>
				</header>

				<main>
					<Details />
				</main>
			</div>
		</BrowserRouter>
	);
}

createRoot(document.getElementById('root')).render(<App />);
