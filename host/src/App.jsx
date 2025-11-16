import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Listing = lazy(() => import('listingModules/Listing'));
const Details = lazy(() => import('detailsModules/Details'));

// add a simple topbar style
const topbarStyle = {
	background: '#3360c0',
	color: '#fff',
	padding: '12px 16px',
	fontSize: 18,
	fontWeight: 600,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
};

export default function App() {
	return (
		<BrowserRouter>
			{/* top bar */}
			<div style={topbarStyle}>E commerce (The host)</div>

			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Listing />} />
					<Route path="/details" element={<Details />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
