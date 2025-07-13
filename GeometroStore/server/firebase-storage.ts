import { db } from './firebase-config';
import { type Order, type InsertOrder } from '@shared/schema';
import { IStorage } from './storage';

export class FirebaseStorage implements IStorage {
  private ordersCollection = db?.collection('orders');
  private counterCollection = db?.collection('counters');

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    if (!this.ordersCollection) {
      throw new Error('Firebase not initialized - please check Firebase configuration');
    }
    
    // Get next order ID
    const nextId = await this.getNextOrderId();
    
    const orderData = {
      ...insertOrder,
      customerPhone: insertOrder.customerPhone || null,
      id: nextId,
      createdAt: new Date(),
    };

    await this.ordersCollection.doc(nextId.toString()).set(orderData);
    
    return orderData as Order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const doc = await this.ordersCollection.doc(id.toString()).get();
    
    if (!doc.exists) {
      return undefined;
    }

    return doc.data() as Order;
  }

  async getAllOrders(): Promise<Order[]> {
    const snapshot = await this.ordersCollection
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => doc.data() as Order);
  }

  private async getNextOrderId(): Promise<number> {
    if (!this.counterCollection || !db) {
      throw new Error('Firebase not initialized - please check Firebase configuration');
    }
    
    const counterDoc = this.counterCollection.doc('orders');
    
    try {
      const result = await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(counterDoc);
        let nextId = 1;
        
        if (doc.exists) {
          nextId = (doc.data()?.count || 0) + 1;
        }
        
        transaction.set(counterDoc, { count: nextId });
        return nextId;
      });
      
      return result;
    } catch (error) {
      console.error('Error getting next order ID:', error);
      // Fallback to timestamp-based ID
      return Date.now();
    }
  }
}