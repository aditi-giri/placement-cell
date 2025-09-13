import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import SidebarLayout from '../SidebarLayout';
import { setTokenIsThere } from '@/config/redux/reducer/authReducer';
import { useDispatch } from 'react-redux';

export default function StudentDashboardLayout({ children }) {

    return (
        <SidebarLayout>
            {children}
        </SidebarLayout>
    );
}