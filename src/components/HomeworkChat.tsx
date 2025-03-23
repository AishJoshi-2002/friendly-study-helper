
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Send, BookOpen, Sparkles, LightbulbIcon } from 'lucide-react';

interface ChatMessage {
  role: 'student' | 'assistant';
  content: string;
  timestamp: Date;
}

interface StudentProfile {
  name: string;
  grade: string;
  favoriteSubject?: string;
  learningStyle?: string;
}

const getGradeLevel = (grade: string): 'elementary' | 'middle' | 'high' | 'college' => {
  if (['preschool', 'kindergarten', 'elementary1', 'elementary2'].includes(grade)) {
    return 'elementary';
  } else if (grade === 'middle') {
    return 'middle';
  } else if (grade === 'highschool') {
    return 'high';
  } else {
    return 'college';
  }
};

const generateAssistantResponse = (message: string, profile: StudentProfile): string => {
  const gradeLevel = getGradeLevel(profile.grade);
  
  // Elementary level responses
  if (gradeLevel === 'elementary') {
    if (message.toLowerCase().includes('count')) {
      return `Hi ${profile.name}! Counting is fun! Let's use some pictures to help. 🍎🍎🍎 How many apples do you see? Count them one by one, pointing at each apple as you count. Take your time!`;
    }
    if (message.toLowerCase().includes('add') || message.toLowerCase().includes('plus')) {
      return `Hi ${profile.name}! Let's think about addition like putting groups together. If you have 2 toys and get 3 more toys, you can count all the toys to find out how many you have now. Can you try drawing the toys and counting them?`;
    }
  }
  
  // Middle school level responses
  if (gradeLevel === 'middle') {
    if (message.toLowerCase().includes('fraction')) {
      return `Hey ${profile.name}! Fractions represent parts of a whole. Think of a pizza cut into 8 slices - each slice is 1/8 of the whole pizza. When you're adding or subtracting fractions, they need to have the same denominator (the bottom number). Would you like me to explain how to find a common denominator?`;
    }
    if (message.toLowerCase().includes('equation')) {
      return `Hi ${profile.name}! When solving equations, think of them like balanced scales. Whatever you do to one side, you must do to the other. Try isolating the variable by moving everything else to the opposite side. What equation are you working with?`;
    }
  }
  
  // High school level responses
  if (gradeLevel === 'high') {
    if (message.toLowerCase().includes('quadratic')) {
      return `Hi ${profile.name}! For quadratic equations, remember the formula: x = (-b ± √(b² - 4ac)) / 2a where ax² + bx + c = 0. First, identify your a, b, and c values, then plug them into the formula. Would you like to try an example together?`;
    }
    if (message.toLowerCase().includes('derivative')) {
      return `Hey ${profile.name}! When finding derivatives, you're looking for the rate of change of a function. For a function f(x) = x², the derivative f'(x) = 2x. What function are you trying to find the derivative of?`;
    }
  }
  
  // College level responses
  if (gradeLevel === 'college') {
    if (message.toLowerCase().includes('calculus')) {
      return `Hi ${profile.name}! In calculus, we're often looking at rates of change or accumulation. For integration, remember it's the opposite of differentiation - you're finding the area under a curve. What specific calculus problem are you working on?`;
    }
    if (message.toLowerCase().includes('physics')) {
      return `Hey ${profile.name}! Physics problems often require identifying the relevant principles first. For mechanics problems, start with drawing a free body diagram to visualize all forces. What physics concept are you studying?`;
    }
  }
  
  // Generic responses if no specific keywords are matched
  const genericResponses = [
    `Hi ${profile.name}! I'd be happy to help with your homework. Could you tell me more about what you're working on?`,
    `Hey ${profile.name}! Let's figure this out together. Can you share the specific question or problem you're trying to solve?`,
    `Hello ${profile.name}! I'm here to guide you, not just give answers. What part of this problem is challenging for you?`,
    `Hi ${profile.name}! Learning works best when we break problems down into steps. What have you tried so far?`
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

const HomeworkChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load profile from localStorage
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      
      // Add welcome message
      setMessages([
        {
          role: 'assistant',
          content: `Hi ${parsedProfile.name}! 👋 I'm your AI homework assistant. What would you like help with today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !profile) return;
    
    // Add student message
    const studentMessage: ChatMessage = {
      role: 'student',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, studentMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const assistantResponse = generateAssistantResponse(input, profile);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const requestHint = () => {
    if (!profile) return;
    
    setIsLoading(true);
    
    // Simulate AI generating a hint
    setTimeout(() => {
      const hintMessage: ChatMessage = {
        role: 'assistant',
        content: `Here's a hint, ${profile.name}: Remember to break down the problem into smaller parts. What's the first step you think we should take?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, hintMessage]);
      setIsLoading(false);
      
      toast({
        title: "Hint provided",
        description: "Try using this hint to move forward with your problem."
      });
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'student' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={message.role === 'student' ? 'chat-bubble-student' : 'chat-bubble-assistant'}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="chat-bubble-assistant">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-assistant-blue rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-assistant-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-assistant-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={requestHint}
            disabled={isLoading}
            className="flex items-center space-x-1"
          >
            <LightbulbIcon className="h-4 w-4" />
            <span>Hint</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast({
                title: "Resources",
                description: "Check out our learning resources section for additional help."
              });
            }}
            className="flex items-center space-x-1"
          >
            <BookOpen className="h-4 w-4" />
            <span>Resources</span>
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your homework question..."
            className="flex-1 resize-none"
            rows={2}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="self-end bg-assistant-blue hover:bg-assistant-accent button-transition"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeworkChat;
