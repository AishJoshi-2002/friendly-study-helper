
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Send, BookOpen, Sparkles, LightbulbIcon, Mic, MicOff, PaperclipIcon, Headphones } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ChatMessage {
  role: 'student' | 'assistant';
  content: string;
  timestamp: Date;
  attachment?: string;
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

const generateAssistantResponse = (message: string, profile: StudentProfile, previousMessages: ChatMessage[]): string => {
  const gradeLevel = getGradeLevel(profile.grade);
  
  const lastFewMessages = previousMessages.slice(-4);
  const hasRepeatedQuestion = lastFewMessages.some(
    msg => msg.role === 'assistant' && 
    (msg.content.includes("Could you tell me more") || 
     msg.content.includes("What have you tried so far"))
  );
  
  if (hasRepeatedQuestion) {
    return `Let's work on this together, ${profile.name}. I'll help guide you through it step by step.`;
  }
  
  // Check for exercise requests
  if (message.toLowerCase().includes('exercise') || 
      message.toLowerCase().includes('practice') || 
      message.toLowerCase().includes('activity')) {
    
    if (message.toLowerCase().includes('number') || message.toLowerCase().includes('count')) {
      // Number exercises based on complexity mentioned
      if (message.toLowerCase().includes('1 to 5') || message.toLowerCase().includes('1-5')) {
        return `Great choice, ${profile.name}! Here are some fun exercises to learn numbers 1-5:

📋 **Exercise 1: Count & Touch**
- Touch your nose 1 time
- Touch your shoulders 2 times
- Tap your head 3 times
- Clap your hands 4 times
- Jump 5 times

📋 **Exercise 2: Draw & Count**
- Draw 1 circle ⭕
- Draw 2 squares ◻️◻️
- Draw 3 triangles 🔺🔺🔺
- Draw 4 stars ⭐⭐⭐⭐
- Draw 5 flowers 🌸🌸🌸🌸🌸

📋 **Exercise 3: Find & Match**
- Find 1 book 📕
- Find 2 socks 🧦🧦
- Find 3 toys 🧸🧸🧸
- Find 4 crayons 🖍️🖍️🖍️🖍️
- Find 5 buttons 🔘🔘🔘🔘🔘

Which exercise would you like to try first? Or would you like a different type of number activity?`;
      } else {
        return `Here are some interactive exercises to help you learn numbers, ${profile.name}!

📋 **Counting Scavenger Hunt**
Find and count objects around you:
- Find 3 blue things
- Find 5 soft things
- Find 7 small objects
- Find 10 items that start with the letter 'B'

📋 **Number Pattern Game**
Continue these patterns:
- 2, 4, 6, ____, ____, ____
- 5, 10, 15, ____, ____, ____
- 1, 3, 5, 7, ____, ____, ____

📋 **Draw & Count Challenge**
Draw these and count them:
- Draw 4 flowers and 3 butterflies. How many things did you draw in total?
- Draw 6 circles and cross out 2. How many are left?
- Draw 8 stars and add 2 more. How many stars now?

Would you like to try one of these activities, or would you prefer a different exercise?`;
      }
    }
    
    if (message.toLowerCase().includes('math') || message.toLowerCase().includes('addition') || 
        message.toLowerCase().includes('subtraction')) {
      return `Here are some fun math exercises, ${profile.name}!

📋 **Picture Addition**
Draw dots and count them together:
- Draw 2 dots, then 3 more dots. Count how many dots altogether.
- Draw 4 stars, then 2 more stars. How many stars total?
- Draw 5 circles, then 3 more circles. How many circles now?

📋 **Subtraction Stories**
- You have 5 apples and eat 2. How many apples are left?
- There are 7 birds on a tree. 4 fly away. How many birds are still on the tree?
- You pick 8 flowers and give 3 to your friend. How many flowers do you have now?

📋 **Number Bond Practice**
What numbers can make:
- 5 (examples: 2+3, 1+4, 0+5)
- 7 (examples: 3+4, 2+5, 1+6)
- 10 (examples: 5+5, 6+4, 7+3)

Which activity would you like to try first?`;
    }
    
    // Generic learning exercises if topic isn't specified
    return `Here are some interactive learning exercises for you, ${profile.name}:

📋 **Number Recognition Game**
- I'll describe a number, you guess which one it is!
- It comes after 2 but before 4. Which number is it?
- It's 1 more than 4. Which number is it?
- It's 2 less than 7. Which number is it?

📋 **Count & Move Activity**
- Jump 3 times and clap 2 times. How many actions did you do total?
- Hop 5 times and spin around 1 time. How many movements altogether?
- Touch your toes 4 times and your nose 4 times. How many touches in all?

📋 **Everyday Math Challenge**
- Count the windows in your home
- Count how many steps it takes to walk from your bedroom to the kitchen
- Find 5 things that come in pairs (like socks, shoes, etc.)

Would you like to try one of these activities or would you like something different?`;
  }
  
  if (message.toLowerCase().includes('learn') && 
     (message.toLowerCase().includes('number') || message.toLowerCase().includes('count'))) {
    return `Great, ${profile.name}! Let's learn counting from 1 to 10. Here's a fun way to practice:

1️⃣ - One: Show me 1 finger!
2️⃣ - Two: Can you show me 2 fingers?
3️⃣ - Three: Now try showing 3 fingers!
4️⃣ - Four: Can you count to 4?
5️⃣ - Five: That's one whole hand! 🖐️
6️⃣ - Six: Keep going!
7️⃣ - Seven: You're doing great!
8️⃣ - Eight: Almost there!
9️⃣ - Nine: Just one more!
🔟 - Ten: Excellent job counting to 10! 🎉

Would you like to practice counting objects too? I can show you some examples!`;
  }
  
  if (gradeLevel === 'elementary') {
    if (message.toLowerCase().includes('count')) {
      return `Hi ${profile.name}! Counting is fun! Let's use some pictures to help. 🍎🍎🍎 How many apples do you see? Count them one by one, pointing at each apple as you count. Take your time!`;
    }
    
    if (message.toLowerCase().includes('apple')) {
      const userCount = message.match(/\d+/);
      const actualCount = 3;
      
      if (userCount && parseInt(userCount[0]) === actualCount) {
        return `That's correct, ${profile.name}! 🎉 There are exactly 3 apples. You're doing a great job counting! Would you like to try counting something else?`;
      } else {
        return `Let's try counting the apples again, ${profile.name}. Look at each apple emoji 🍎🍎🍎 and count them one by one. How many do you see?`;
      }
    }
  }
  
  if (gradeLevel === 'middle') {
    if (message.toLowerCase().includes('fraction')) {
      return `Hey ${profile.name}! Fractions represent parts of a whole. Think of a pizza cut into 8 slices - each slice is 1/8 of the whole pizza. When you're adding or subtracting fractions, they need to have the same denominator (the bottom number). Would you like me to explain how to find a common denominator?`;
    }
    if (message.toLowerCase().includes('equation')) {
      return `Hi ${profile.name}! When solving equations, think of them like balanced scales. Whatever you do to one side, you must do to the other. Try isolating the variable by moving everything else to the opposite side. What equation are you working with?`;
    }
  }
  
  if (gradeLevel === 'high') {
    if (message.toLowerCase().includes('quadratic')) {
      return `Hi ${profile.name}! For quadratic equations, remember the formula: x = (-b ± √(b² - 4ac)) / 2a where ax² + bx + c = 0. First, identify your a, b, and c values, then plug them into the formula. Would you like to try an example together?`;
    }
    if (message.toLowerCase().includes('derivative')) {
      return `Hey ${profile.name}! When finding derivatives, you're looking for the rate of change of a function. For a function f(x) = x², the derivative f'(x) = 2x. What function are you trying to find the derivative of?`;
    }
  }
  
  if (gradeLevel === 'college') {
    if (message.toLowerCase().includes('calculus')) {
      return `Hi ${profile.name}! In calculus, we're often looking at rates of change or accumulation. For integration, remember it's the opposite of differentiation - you're finding the area under a curve. What specific calculus problem are you working on?`;
    }
    if (message.toLowerCase().includes('physics')) {
      return `Hey ${profile.name}! Physics problems often require identifying the relevant principles first. For mechanics problems, start with drawing a free body diagram to visualize all forces. What physics concept are you studying?`;
    }
  }
  
  const genericResponses = [
    `Hi ${profile.name}! I'd be happy to help with your homework. What specific topic are you studying?`,
    `Hey ${profile.name}! What question would you like help with today?`,
    `Hello ${profile.name}! I'm your homework assistant. Let me know what you'd like to work on!`,
    `Hi ${profile.name}! Ready to tackle some homework? What subject are we exploring today?`,
    `Hey ${profile.name}! What specific problem would you like me to help you understand?`
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

const textToSpeech = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
};

const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

const HomeworkChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fileAttachment, setFileAttachment] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      
      setMessages([
        {
          role: 'assistant',
          content: `Hi ${parsedProfile.name}! 👋 I'm your AI homework assistant. What would you like help with today?`,
          timestamp: new Date()
        }
      ]);
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      console.log('Speech recognition is supported in this browser');
    } else {
      console.log('Speech recognition is not supported in this browser');
    }

    return () => {
      stopSpeech();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if ((!input.trim() && !fileAttachment) || !profile) return;
    
    const studentMessage: ChatMessage = {
      role: 'student',
      content: input,
      timestamp: new Date(),
      attachment: fileAttachment ? URL.createObjectURL(fileAttachment) : undefined
    };
    
    setMessages(prev => [...prev, studentMessage]);
    setInput('');
    setFileAttachment(null);
    setIsLoading(true);
    
    setTimeout(() => {
      const assistantResponse = generateAssistantResponse(input, profile, messages);
      
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

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.onstart = () => {
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Speak clearly into your microphone"
        });
      };

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognitionAPI) {
          const recognition = new SpeechRecognitionAPI();
          recognition.lang = 'en-US';
          
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            
            toast({
              title: "Speech recognized",
              description: "Check and edit if needed before sending"
            });
          };
          
          recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            toast({
              title: "Could not recognize speech",
              description: "Please type your message instead",
              variant: "destructive"
            });
          };
          
          recognition.start();
        } else {
          toast({
            title: "Speech recognition not supported",
            description: "Please type your message instead",
            variant: "destructive"
          });
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone', error);
      toast({
        title: "Microphone access denied",
        description: "Please enable microphone access and try again",
        variant: "destructive"
      });
    }
  };

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setFileAttachment(file);
      toast({
        title: "File attached",
        description: `${file.name} ready to send`
      });
    }
  };

  const speakMessage = (message: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    textToSpeech(message);
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
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
              className={`${message.role === 'student' ? 'chat-bubble-student' : 'chat-bubble-assistant'} ${message.attachment ? 'space-y-2' : ''}`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.attachment && (
                <div className="mt-2 border rounded p-2">
                  <a href={message.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                    <PaperclipIcon className="h-4 w-4 mr-1" />
                    View attachment
                  </a>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                
                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1"
                    onClick={() => speakMessage(message.content)}
                  >
                    <Headphones className="h-3 w-3" />
                  </Button>
                )}
              </div>
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
          
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
            className="flex items-center space-x-1 ml-auto"
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span>{isRecording ? "Stop" : "Voice"}</span>
          </Button>
        </div>
        
        {fileAttachment && (
          <div className="mb-2 p-2 bg-gray-50 rounded-md flex items-center justify-between">
            <div className="truncate text-sm">
              <PaperclipIcon className="h-4 w-4 inline mr-1" />
              {fileAttachment.name}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setFileAttachment(null)}
            >
              ✕
            </Button>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your homework question..."
            className="flex-1 resize-none"
            rows={2}
          />
          
          <div className="flex flex-col space-y-2 self-end">
            <Button
              onClick={handleFileAttachment}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={(!input.trim() && !fileAttachment) || isLoading}
              className="self-end bg-assistant-blue hover:bg-assistant-accent button-transition"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default HomeworkChat;
