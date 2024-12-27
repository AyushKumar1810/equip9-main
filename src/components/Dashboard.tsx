import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    const timeOfDay = 
      currentHour < 12 ? "Good Morning" :
      currentHour < 18 ? "Good Afternoon" :
      "Good Evening";
    return `Welcome ${user?.firstName} ${user?.lastName}, ${timeOfDay}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
      toast.success("Todo added successfully!");
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    toast.success("Todo removed successfully!");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50 animate-fadeIn">
      <div className="absolute top-4 right-4">
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
      
      <div className="max-w-4xl mx-auto mt-20 space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {getGreeting()}
        </h1>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
          
          <div className="flex gap-2 mb-6">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <Button onClick={handleAddTodo}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
              >
                <span>{todo}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTodo(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500">No todos yet. Add one above!</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;