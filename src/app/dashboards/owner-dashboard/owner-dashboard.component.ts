import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.scss'
})
export class OwnerDashboardComponent {
  @ViewChild('ordersChart') ordersChartRef!: ElementRef;
  @ViewChild('revenueChart') revenueChartRef!: ElementRef;

  ordersChart: any;
  revenueChart: any;

  statsCards = [
    {
      title: 'Number of Canteens',
      value: '24',
      bgColor: 'bg-teal-400',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      title: 'Number of Managers',
      value: '38',
      bgColor: 'bg-blue-400',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      title: 'Number of Owners',
      value: '12',
      bgColor: 'bg-indigo-400',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      title: 'Kitchen Staff',
      value: '86',
      bgColor: 'bg-purple-400',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      title: 'QR Codes',
      value: '156',
      bgColor: 'bg-red-400',
      icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z'
    },
    {
      title: 'Total Orders',
      value: '2,458',
      bgColor: 'bg-amber-400',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    },
    {
      title: 'Active Users',
      value: '632',
      bgColor: 'bg-emerald-400',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    {
      title: 'Total Revenue',
      value: '$32,584',
      bgColor: 'bg-rose-400',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  recentOrders = [
    { id: '7523', customer: 'John Smith', status: 'Completed', amount: '32.50' },
    { id: '7522', customer: 'Alice Johnson', status: 'Preparing', amount: '24.75' },
    { id: '7521', customer: 'Robert Brown', status: 'Pending', amount: '56.20' },
    { id: '7520', customer: 'Emma Davis', status: 'Completed', amount: '18.90' },
    { id: '7519', customer: 'Michael Wilson', status: 'Cancelled', amount: '42.30' }
  ];

  popularItems = [
    { image: '🍔', name: 'Classic Burger', category: 'Fast Food', price: '8.99', orderCount: '156' },
    { image: '🍕', name: 'Pepperoni Pizza', category: 'Italian', price: '12.50', orderCount: '132' },
    { image: '🥗', name: 'Caesar Salad', category: 'Healthy', price: '6.75', orderCount: '98' },
    { image: '🍜', name: 'Ramen Bowl', category: 'Asian', price: '10.25', orderCount: '87' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initOrdersChart();
    this.initRevenueChart();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800';
      case 'Preparing':
        return 'px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800';
      case 'Pending':
        return 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800';
      default:
        return 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800';
    }
  }

  initOrdersChart(): void {
    const ctx = this.ordersChartRef.nativeElement.getContext('2d');

    this.ordersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Orders',
          data: [65, 59, 80, 81, 56, 96, 82],
          backgroundColor: '#4fd1c5', // teal-400
          borderColor: '#38b2ac', // teal-500
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initRevenueChart(): void {
    const ctx = this.revenueChartRef.nativeElement.getContext('2d');

    this.revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [3100, 4200, 2800, 5100, 4800, 6200],
          fill: false,
          tension: 0.4,
          backgroundColor: '#4fd1c5', // teal-400
          borderColor: '#38b2ac', // teal-500
          borderWidth: 2,
          pointBackgroundColor: '#38b2ac',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }
}
