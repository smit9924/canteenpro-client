import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ORDER_DETAIL_PAGE } from '../common/appConstants';
import { Router } from '@angular/router';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: Date;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'completed' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: string;
    lastFour: string;
  };
}


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  // Sample order data
  orders: Order[] = [
    {
      id: 1,
      orderNumber: '10045876',
      date: new Date('2025-03-15'),
      items: [
        { id: 101, name: 'Wireless Headphones', quantity: 1, price: 129.99 },
        { id: 102, name: 'Phone Case', quantity: 2, price: 24.99 }
      ],
      total: 179.97,
      status: 'completed',
      shippingAddress: {
        street: '123 Main St',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '4242'
      }
    },
    {
      id: 2,
      orderNumber: '10045877',
      date: new Date('2025-03-28'),
      items: [
        { id: 201, name: 'Smart Watch', quantity: 1, price: 249.99 }
      ],
      total: 249.99,
      status: 'shipped',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Austin',
        state: 'TX',
        zipCode: '78702',
        country: 'USA'
      },
      paymentMethod: {
        type: 'PayPal',
        lastFour: ''
      }
    },
    {
      id: 3,
      orderNumber: '10045878',
      date: new Date('2025-04-02'),
      items: [
        { id: 301, name: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
        { id: 302, name: 'USB-C Cable (3-pack)', quantity: 1, price: 19.99 },
        { id: 303, name: 'Wireless Charger', quantity: 1, price: 34.99 }
      ],
      total: 134.97,
      status: 'processing',
      shippingAddress: {
        street: '789 Pine Blvd',
        city: 'Austin',
        state: 'TX',
        zipCode: '78703',
        country: 'USA'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '1234'
      }
    },
    {
      id: 4,
      orderNumber: '10045879',
      date: new Date('2025-04-05'),
      items: [
        { id: 401, name: 'Laptop Sleeve', quantity: 1, price: 39.99 },
        { id: 402, name: 'Wireless Mouse', quantity: 1, price: 49.99 }
      ],
      total: 89.98,
      status: 'processing',
      shippingAddress: {
        street: '101 Cedar Ln',
        city: 'Austin',
        state: 'TX',
        zipCode: '78704',
        country: 'USA'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '5678'
      }
    },
    {
      id: 5,
      orderNumber: '10045880',
      date: new Date('2025-02-20'),
      items: [
        { id: 501, name: 'Wireless Earbuds', quantity: 1, price: 159.99 }
      ],
      total: 159.99,
      status: 'cancelled',
      shippingAddress: {
        street: '222 Maple Dr',
        city: 'Austin',
        state: 'TX',
        zipCode: '78705',
        country: 'USA'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '9876'
      }
    },
    {
      id: 6,
      orderNumber: '10045881',
      date: new Date('2025-03-10'),
      items: [
        { id: 601, name: 'Tablet Stand', quantity: 1, price: 29.99 },
        { id: 602, name: 'Screen Protector', quantity: 2, price: 14.99 },
        { id: 603, name: 'Stylus Pen', quantity: 1, price: 24.99 }
      ],
      total: 84.96,
      status: 'completed',
      shippingAddress: {
        street: '333 Birch St',
        city: 'Austin',
        state: 'TX',
        zipCode: '78706',
        country: 'USA'
      },
      paymentMethod: {
        type: 'PayPal',
        lastFour: ''
      }
    }
  ];

  filteredOrders: Order[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  searchQuery: string = '';
  statusFilter: string = 'all';
  Math = Math; // To use Math in template

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filterOrders();
  }

  filterOrders(): void {
    // Apply search query filter
    let result = this.orders;

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(order =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      result = result.filter(order => order.status === this.statusFilter);
    }

    // Sort by date (newest first)
    result = [...result].sort((a, b) => b.date.getTime() - a.date.getTime());

    this.filteredOrders = result;
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);

    // Ensure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  searchOrders(event: any): void {
    this.searchQuery = event.target.value;
    this.currentPage = 1;
    this.filterOrders();
  }

  filterByStatus(event: any): void {
    this.statusFilter = event.target.value;
    this.currentPage = 1;
    this.filterOrders();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);

    // Show up to 5 page numbers
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  viewOrderDetails(order: Order): void {
    // In a real app, this would navigate to a details page or open a modal
    console.log('View details for order:', order);
    this.router.navigateByUrl(ORDER_DETAIL_PAGE);
  }

  cancelOrder(order: Order): void {
    // In a real app, this would call a service to cancel the order
    console.log('Cancel order:', order);
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.orders[index].status = 'cancelled';
      this.filterOrders();
    }
  }

  exportOrders(): void {
    // In a real app, this would generate a CSV or PDF export
    console.log('Export orders');
    alert('Orders exported successfully!');
  }
}
