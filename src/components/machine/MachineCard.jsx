import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { machineCardVariants } from "../MotionVariant";

function MachineCard({ machine, onCardClick }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={machineCardVariants}
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCardClick(machine)}
    >
      <Card className="cursor-pointer border-2 hover:border-primary/50 h-full">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-primary/10 rounded-full"
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <Settings className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="space-y-1">
                <CardTitle className="text-xl">{machine.productId}</CardTitle>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Machine ID</p>
              <p className="font-semibold">{machine.productId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Machine Name</p>
              <p className="font-semibold">{machine.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MachineCard;
