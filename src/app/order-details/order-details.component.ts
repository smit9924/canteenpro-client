import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ORDER_HISTORY_PAGE } from '../common/appConstants';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface Order {
  id: number;
  orderNumber: string;
  date: Date;
  estimatedDelivery?: Date;
  cancelDate?: Date;
  items: OrderItem[];
  subtotal?: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'processing' | 'shipped' | 'completed' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  deliveryInfo: {
    name: string;
    phone: string;
    instructions?: string;
  };
  paymentMethod: {
    type: string;
    lastFour: string;
  };
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  orderId?: number = 1;
  order?: Order;

  // Sample order data array - in a real app, this would come from a service
  orders: Order[] = [
    {
      id: 1,
      orderNumber: '10045876',
      date: new Date('2025-03-15T14:30:00'),
      estimatedDelivery: new Date('2025-03-18'),
      items: [
        {
          id: 101,
          name: 'Spicy Chicken Burger',
          quantity: 2,
          price: 12.99,
          options: ['Extra Cheese', 'No Onions']
        },
        {
          id: 102,
          name: 'Sweet Potato Fries',
          quantity: 1,
          price: 4.99
        },
        {
          id: 103,
          name: 'Chocolate Milkshake',
          quantity: 2,
          price: 5.99
        }
      ],
      tax: 3.50,
      deliveryFee: 2.99,
      discount: 5.00,
      total: 42.44,
      status: 'completed',
      shippingAddress: {
        street: '123 Main St',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA'
      },
      deliveryInfo: {
        name: 'John Doe',
        phone: '(512) 555-1234',
        instructions: 'Please leave at the front door.'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '4242'
      }
    },
    {
      id: 2,
      orderNumber: '10045877',
      date: new Date('2025-03-28T12:15:00'),
      estimatedDelivery: new Date('2025-03-30'),
      items: [
        {
          id: 201,
          name: 'Margherita Pizza',
          quantity: 1,
          price: 14.99,
          options: ['Thin Crust']
        },
        {
          id: 202,
          name: 'Garlic Breadsticks',
          quantity: 1,
          price: 6.99
        },
        {
          id: 203,
          name: 'Caesar Salad',
          quantity: 1,
          price: 8.99
        }
      ],
      tax: 3.10,
      deliveryFee: 3.99,
      discount: 0,
      total: 38.06,
      status: 'shipped',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Austin',
        state: 'TX',
        zipCode: '78702',
        country: 'USA'
      },
      deliveryInfo: {
        name: 'Jane Smith',
        phone: '(512) 555-5678'
      },
      paymentMethod: {
        type: 'PayPal',
        lastFour: ''
      }
    },
    {
      id: 3,
      orderNumber: '10045878',
      date: new Date('2025-04-02T18:45:00'),
      estimatedDelivery: new Date('2025-04-04'),
      items: [
        {
          id: 301,
          name: 'Vegetable Stir Fry',
          quantity: 1,
          price: 13.99,
          options: ['Extra Spicy', 'No Mushrooms']
        },
        {
          id: 302,
          name: 'Spring Rolls',
          quantity: 2,
          price: 5.99
        },
        {
          id: 303,
          name: 'Jasmine Rice',
          quantity: 1,
          price: 2.99
        }
      ],
      tax: 2.90,
      deliveryFee: 3.99,
      discount: 0,
      total: 33.85,
      status: 'processing',
      shippingAddress: {
        street: '789 Pine Blvd',
        city: 'Austin',
        state: 'TX',
        zipCode: '78703',
        country: 'USA'
      },
      deliveryInfo: {
        name: 'Robert Johnson',
        phone: '(512) 555-9012',
        instructions: 'Call when you arrive.'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '1234'
      }
    },
    {
      id: 4,
      orderNumber: '10045879',
      date: new Date('2025-04-05T20:30:00'),
      estimatedDelivery: new Date('2025-04-07'),
      items: [
        {
          id: 401,
          name: 'Fish Tacos',
          quantity: 3,
          price: 4.99
        },
        {
          id: 402,
          name: 'Guacamole & Chips',
          quantity: 1,
          price: 6.99
        },
        {
          id: 403,
          name: 'Mexican Soda',
          quantity: 2,
          price: 2.99
        }
      ],
      tax: 2.54,
      deliveryFee: 2.99,
      discount: 0,
      total: 33.47,
      status: 'processing',
      shippingAddress: {
        street: '101 Cedar Ln',
        city: 'Austin',
        state: 'TX',
        zipCode: '78704',
        country: 'USA'
      },
      deliveryInfo: {
        name: 'Sarah Williams',
        phone: '(512) 555-3456'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '5678'
      }
    },
    {
      id: 5,
      orderNumber: '10045880',
      date: new Date('2025-02-20T19:15:00'),
      cancelDate: new Date('2025-02-20T20:30:00'),
      items: [
        {
          id: 501,
          name: 'Sushi Combo',
          quantity: 1,
          price: 25.99
        },
        {
          id: 502,
          name: 'Miso Soup',
          quantity: 2,
          price: 3.99
        }
      ],
      tax: 3.40,
      deliveryFee: 3.99,
      discount: 0,
      total: 37.37,
      status: 'cancelled',
      shippingAddress: {
        street: '222 Maple Dr',
        city: 'Austin',
        state: 'TX',
        zipCode: '78705',
        country: 'USA'
      },
      deliveryInfo: {
        name: 'Michael Brown',
        phone: '(512) 555-7890'
      },
      paymentMethod: {
        type: 'Credit Card',
        lastFour: '9876'
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get the order ID from the route parameters
    this.route.params.subscribe(params => {
      // this.orderId = +params['id']; // Convert string to number
      this.loadOrder();
    });
  }

  loadOrder(): void {
    // In a real app, this would call a service to fetch the order
    this.order = this.orders.find(o => o.id === this.orderId);
    console.log("this.order: ", this.order)
  }

  goBack(): void {
    // this.location.back();
    this.router.navigateByUrl(ORDER_HISTORY_PAGE);
  }

  calculateSubtotal(): number {
    if (!this.order) return 0;

    return this.order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Order progress status getters
  get isOrderStarted(): boolean {
    return this.order?.status !== 'cancelled';
  }

  get isOrderProcessing(): boolean {
    return this.order?.status === 'processing' ||
      this.order?.status === 'shipped' ||
      this.order?.status === 'completed';
  }

  get isOrderShipped(): boolean {
    return this.order?.status === 'shipped' ||
      this.order?.status === 'completed';
  }

  get isOrderCompleted(): boolean {
    return this.order?.status === 'completed';
  }

  getProgressWidth(): string {
    if (!this.order) return '0%';

    switch (this.order.status) {
      case 'cancelled':
        return '0%';
      case 'processing':
        return '33%';
      case 'shipped':
        return '66%';
      case 'completed':
        return '100%';
      default:
        return '0%';
    }
  }

  getDeliveryMessage(): string {
    if (!this.order) return '';

    if (this.order.status === 'completed') {
      return `Your order was delivered on ${this.formatDate(this.order.estimatedDelivery)}`;
    } else if (this.order.status === 'shipped') {
      return `Your order is on its way! Estimated delivery on ${this.formatDate(this.order.estimatedDelivery)}`;
    } else if (this.order.status === 'processing') {
      return `Your order is being prepared. Estimated delivery on ${this.formatDate(this.order.estimatedDelivery)}`;
    }

    return '';
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }

  cancelOrder(): void {
    if (!this.order) return;

    // In a real app, this would call a service to cancel the order
    if (this.order.status === 'processing') {
      this.order.status = 'cancelled';
      this.order.cancelDate = new Date();
      console.log('Order cancelled:', this.order);
      // Here you would typically show a confirmation modal or toast notification
      alert('Your order has been cancelled successfully.');
    }
  }

  printOrder(): void {
    // In a real app, this would either:
    // 1. Open a print-friendly version of the page
    // 2. Generate and download a PDF
    console.log('Print order:', this.order);
    window.print();
  }

  contactSupport(): void {
    // In a real app, this would:
    // 1. Open a support chat modal
    // 2. Navigate to a contact form
    // 3. Show contact information
    console.log('Contact support for order:', this.order);
    alert('Customer support: (800) 123-4567 or support@yourfoodapp.com\nPlease reference order number: ' + this.order?.orderNumber);
  }
}
