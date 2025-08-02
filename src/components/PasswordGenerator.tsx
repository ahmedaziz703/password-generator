import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generatePassword, calculateStrength } from "@/lib/password";
import { Copy, RefreshCw } from "lucide-react";

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const optionLabels = {
    uppercase: "أحرف كبيرة",
    lowercase: "أحرف صغيرة", 
    numbers: "أرقام",
    symbols: "رموز"
  };

  const handleGenerate = () => {
    const newPassword = generatePassword(length[0], options);
    setPassword(newPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "تم النسخ",
      description: "تم نسخ كلمة المرور إلى الحافظة",
    });
  };

  const strength = calculateStrength(password, options);
  const getStrengthColor = () => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full max-w-md p-6 backdrop-blur-xl bg-white/10 rounded-xl shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">مولد كلمات المرور الآمنة</h2>
      
      <div className="bg-white/20 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <code className="text-xl text-white flex-1 overflow-x-auto text-left" dir="ltr">
            {password || "اضغط لتوليد كلمة مرور"}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-white/20"
            disabled={!password}
          >
            <Copy className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        <div className="mt-2 h-2 rounded-full bg-white/20 overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all duration-500`}
            style={{ width: `${strength}%` }}
          />
        </div>
        <div className="text-white text-xs mt-1 text-center">
          قوة كلمة المرور: {strength}%
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-white text-sm">طول كلمة المرور: {length[0]}</label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={32}
            min={8}
            step={1}
            className="py-4"
          />
        </div>

        <div className="space-y-3">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-white">{optionLabels[key as keyof typeof optionLabels]}</label>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-white/20 hover:bg-white/30 text-white"
          onClick={handleGenerate}
        >
          <RefreshCw className="ml-2 h-4 w-4" />
          توليد كلمة مرور جديدة
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;