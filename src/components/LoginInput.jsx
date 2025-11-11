import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login, putAccessToken, getUserLogged } from "@/utils/api";
import AlertPopup from "@/components/AlertPopup";


function LoginInput({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({ title: "", description: "" });

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showAlert = (title, description) => {
    setAlertMessage({ title, description });
    setAlertOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error, data, message } = await login({ email, password });

      if (!error) {
        putAccessToken(data.accessToken);
        
        const { error: userError, data: userData } = await getUserLogged();
        
        if (!userError) {
          onLogin(userData);
        } else {
          onLogin(data);
        }
      } else {
        showAlert("Login Failed", message || "Please check your credentials and try again.");
      }
    } catch (err) {
      showAlert("Login Failed", "An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertPopup
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title={alertMessage.title}
        description={alertMessage.description}
      />
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Maintenance Copilot Dashboard</CardTitle>
        <CardDescription>
          Enter your credential below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={onPasswordChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
    </>
  );
}

export default LoginInput;
