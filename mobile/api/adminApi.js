import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { variable } from './variables';
//const baseUrl = variable.base_url;
const baseUrl = variable.base_url;

//console.log(baseUrl)
const api = axios.create({
    baseURL: baseUrl,
});

export const getReporteAdminP= () => api.get('/admin/reporte/productos').then(res => res.data);
export const getReporteAdminV= () => api.get('/admin/reporte/vendedores').then(res => res.data);
export const getReporteAdminC = () => api.get('/admin/reporte/categoria').then(res => res.data);