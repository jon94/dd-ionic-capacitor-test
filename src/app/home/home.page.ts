import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { datadogRum } from '@datadog/browser-rum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  stats = {
    interactions: 0,
    errors: 0,
    apiCalls: 0,
    customEvents: 0
  };

  constructor(private toastController: ToastController) {}

  async trackUserInteraction() {
    this.stats.interactions++;
    
    datadogRum.addAction('user_interaction', {
      action_type: 'button_click',
      feature: 'user_interactions',
      timestamp: new Date().toISOString()
    });

    await this.showToast('User interaction tracked!', 'success');
    console.log('✅ User interaction tracked');
  }

  async associateUser() {
    const userId = 'user-' + Math.random().toString(36).substring(7);
    
    datadogRum.setUser({
      id: userId,
      name: 'Test User',
      email: 'test@example.com'
    });

    datadogRum.addAction('user_identified', {
      user_id: userId,
      timestamp: new Date().toISOString()
    });

    await this.showToast('User identified!', 'secondary');
    console.log('✅ User associated:', userId);
  }

  async trackError() {
    this.stats.errors++;
    
    const sampleError = new Error('Sample error for testing - Error #' + this.stats.errors);
    
    datadogRum.addError(sampleError, {
      error_type: 'test_error',
      error_number: this.stats.errors,
      source: 'manual_test',
      timestamp: new Date().toISOString()
    });

    await this.showToast('Error tracked!', 'warning');
    console.log('⚠️ Error tracked:', this.stats.errors);
  }

  async trackPerformance() {
    this.stats.customEvents++;
    
    const startTime = performance.now();
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const endTime = performance.now();
    const duration = endTime - startTime;

    datadogRum.addAction('performance_timing', {
      operation: 'simulated_task',
      duration_ms: duration,
      timestamp: new Date().toISOString()
    });

    await this.showToast(`Performance tracked: ${duration.toFixed(2)}ms`, 'tertiary');
    console.log('⚡ Performance tracked:', duration);
  }

  async makeApiCall() {
    this.stats.apiCalls++;
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      
      datadogRum.addAction('api_call_success', {
        api_endpoint: 'jsonplaceholder.typicode.com',
        response_status: response.status,
        call_number: this.stats.apiCalls,
        timestamp: new Date().toISOString()
      });

      await this.showToast('API call successful!', 'success');
      console.log('✅ API call successful:', data);
    } catch (error) {
      datadogRum.addError(error as Error, {
        error_type: 'api_error',
        call_number: this.stats.apiCalls
      });
      
      await this.showToast('API call failed!', 'danger');
      console.error('❌ API call failed:', error);
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}

