import { orders, type Order, type InsertOrder } from "@shared/schema";
import { FirebaseStorage } from "./firebase-storage";
import { db } from "./firebase-config";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private orders: Map<number, Order>;
  private currentId: number;

  constructor() {
    this.orders = new Map();
    this.currentId = 1;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = {
      ...insertOrder,
      customerPhone: insertOrder.customerPhone || null,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

// Use Firebase storage if available, otherwise fallback to in-memory storage
let storageInstance: IStorage;
if (db) {
  console.log('Using Firebase storage');
  storageInstance = new FirebaseStorage();
} else {
  console.log('Using in-memory storage (Firebase not available)');
  storageInstance = new MemStorage();
}

export const storage = storageInstance;
