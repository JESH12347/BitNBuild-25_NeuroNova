'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { db } from '@/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStaffAdded: () => void;
}

export function AddStaffModal({ isOpen, onClose, onStaffAdded }: AddStaffModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    shift: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.shift) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'staff'), {
        ...formData,
        status: 'active', // Default status
        performance: 80, // Default value
        deliveries: 0, // Default value
        rating: 4.5, // Default value
        createdAt: Timestamp.now(),
      });

      alert('✅ Staff member added successfully!');
      onStaffAdded(); // Refresh the staff list
      onClose();

      // Reset form
      setFormData({
        name: '',
        role: '',
        shift: '',
      });
    } catch (error) {
      console.error('Error adding staff member:', error);
      alert('❌ Failed to add staff member, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Staff Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Staff Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., Raj Kumar" required />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Delivery Executive">Delivery Executive</SelectItem>
                <SelectItem value="Kitchen Staff">Kitchen Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="shift">Shift</Label>
            <Input id="shift" value={formData.shift} onChange={(e) => setFormData(prev => ({ ...prev, shift: e.target.value }))} placeholder="e.g., Morning (9 AM - 2 PM)" required />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Staff'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}