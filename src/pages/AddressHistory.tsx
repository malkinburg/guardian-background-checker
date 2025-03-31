
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import CheckProgressStepper from '@/components/CheckProgressStepper';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

const AddressHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      country: "Australia",
      address: "123 Main St",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      yearsLived: 2,
      monthsLived: 3
    }
  ]);
  
  const steps = [
    { id: 1, label: 'Details', status: 'completed' as const },
    { id: 2, label: 'Address', status: 'current' as const },
    { id: 3, label: 'Identity', status: 'upcoming' as const },
    { id: 4, label: 'Work', status: 'upcoming' as const },
    { id: 5, label: 'Finalise', status: 'upcoming' as const }
  ];
  
  const checkId = "10662663";
  
  const addNewAddress = () => {
    setAddresses([...addresses, {
      id: addresses.length + 1,
      country: "",
      address: "",
      suburb: "",
      state: "",
      postcode: "",
      yearsLived: 0,
      monthsLived: 0
    }]);
  };
  
  const removeAddress = (id: number) => {
    if (addresses.length <= 1) {
      toast({
        title: "Cannot remove address",
        description: "You must have at least one address in your history.",
        variant: "destructive",
      });
      return;
    }
    
    setAddresses(addresses.filter(addr => addr.id !== id));
  };
  
  const updateAddress = (id: number, field: string, value: string | number) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, [field]: value } : addr
    ));
  };
  
  const handleContinue = () => {
    // Validate addresses
    const isValid = addresses.every(addr => 
      addr.country && addr.address && addr.suburb && addr.state && addr.postcode
    );
    
    if (!isValid) {
      toast({
        title: "Missing information",
        description: "Please complete all address fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    // Store in session storage (in a real app, would send to backend)
    sessionStorage.setItem('addressHistory', JSON.stringify(addresses));
    
    toast({
      title: "Address history saved",
      description: "Your address history has been saved successfully.",
    });
    
    // Navigate to next step
    navigate("/identity-verification");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <CheckProgressStepper steps={steps} checkId={checkId} />
        
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Address History</h1>
          
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="text-blue-700">List your previous addresses for the last 5 years</p>
          </div>
          
          {addresses.map((address, index) => (
            <div key={address.id} className="mb-8 p-4 border border-slate-200 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">
                  {index === 0 ? "Current Address" : `Previous Address ${index}`}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeAddress(address.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`country-${address.id}`}>Country</Label>
                  <Select 
                    value={address.country} 
                    onValueChange={(value) => updateAddress(address.id, 'country', value)}
                  >
                    <SelectTrigger id={`country-${address.id}`}>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="New Zealand">New Zealand</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`address-${address.id}`}>Street Address</Label>
                  <Input
                    id={`address-${address.id}`}
                    value={address.address}
                    onChange={(e) => updateAddress(address.id, 'address', e.target.value)}
                    placeholder="e.g., 123 Main Street"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor={`suburb-${address.id}`}>Suburb/Town</Label>
                  <Input
                    id={`suburb-${address.id}`}
                    value={address.suburb}
                    onChange={(e) => updateAddress(address.id, 'suburb', e.target.value)}
                    placeholder="e.g., Sydney"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`state-${address.id}`}>State</Label>
                  <Select 
                    value={address.state} 
                    onValueChange={(value) => updateAddress(address.id, 'state', value)}
                  >
                    <SelectTrigger id={`state-${address.id}`}>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">NSW</SelectItem>
                      <SelectItem value="VIC">VIC</SelectItem>
                      <SelectItem value="QLD">QLD</SelectItem>
                      <SelectItem value="WA">WA</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="TAS">TAS</SelectItem>
                      <SelectItem value="ACT">ACT</SelectItem>
                      <SelectItem value="NT">NT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`postcode-${address.id}`}>Postcode</Label>
                  <Input
                    id={`postcode-${address.id}`}
                    value={address.postcode}
                    onChange={(e) => updateAddress(address.id, 'postcode', e.target.value)}
                    placeholder="e.g., 2000"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">How long have you lived at this address?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`years-${address.id}`}>Years</Label>
                    <Select 
                      value={address.yearsLived.toString()} 
                      onValueChange={(value) => updateAddress(address.id, 'yearsLived', parseInt(value))}
                    >
                      <SelectTrigger id={`years-${address.id}`}>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(11)].map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`months-${address.id}`}>Months</Label>
                    <Select 
                      value={address.monthsLived.toString()} 
                      onValueChange={(value) => updateAddress(address.id, 'monthsLived', parseInt(value))}
                    >
                      <SelectTrigger id={`months-${address.id}`}>
                        <SelectValue placeholder="Select months" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="mb-8" 
            onClick={addNewAddress}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Previous Address
          </Button>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/personal-details")}
            >
              Back
            </Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleContinue}
            >
              Save & Continue
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AddressHistory;
