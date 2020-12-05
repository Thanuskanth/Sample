import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer';
import DashboardView from 'src/views/reports/DashboardView'; 
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/package';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/auth/user/profile.componenant';
import Owner from 'src/views/owners';
import Program from 'src/views/program';
import Item from 'src/views/item';
import Invoice from 'src/views/invoice/invoice';
import Print from 'src/views/print/print';
import Receipt from 'src/views/receipt'
import PrintReceipt from 'src/views/print/receipt/print'
import PrintDebit from 'src/views/print/debit/print'
import ProPacListView from 'src/views/program_package'
import Service from 'src/views/service'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'Program', element: <Program /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'Package', element: <ProductListView /> },
      { path: 'program_package', element: <ProPacListView /> },
      { path: 'Items', element: <Item /> },
      { path: 'Invoice', element: <Invoice /> },
      { path: 'account', element: <SettingsView /> },
      { path: 'Invoice', element: <Invoice /> },
      { path: 'Owners', element: <Owner /> },
      { path: 'service', element: <Service /> },
     
      { path: 'Receipt', element: <Receipt /> },
    ]
  },


  { path: 'print', element: <Print /> },
  { path: 'print_receipt', element: <PrintReceipt /> },
  { path: 'print_debit', element: <PrintDebit /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [


      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
