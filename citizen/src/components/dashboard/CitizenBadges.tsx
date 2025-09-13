import { Award, Leaf, Shield, Users, Zap, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  maxProgress: number;
  earned: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const citizenBadges: BadgeData[] = [
  {
    id: "eco-warrior",
    name: "Eco Warrior",
    description: "Report 10 environmental issues",
    icon: Leaf,
    progress: 8,
    maxProgress: 10,
    earned: false,
    rarity: "rare"
  },
  {
    id: "safety-guardian",
    name: "Safety Guardian", 
    description: "Report 5 safety concerns",
    icon: Shield,
    progress: 5,
    maxProgress: 5,
    earned: true,
    rarity: "epic"
  },
  {
    id: "community-voice",
    name: "Community Voice",
    description: "Engage in 20 discussions",
    icon: Users,
    progress: 15,
    maxProgress: 20,
    earned: false,
    rarity: "common"
  },
  {
    id: "quick-reporter",
    name: "Quick Reporter",
    description: "Report issue within 1 hour",
    icon: Zap,
    progress: 1,
    maxProgress: 1,
    earned: true,
    rarity: "legendary"
  }
];

const rarityConfig = {
  common: {
    color: "bg-muted",
    text: "text-muted-foreground",
    glow: ""
  },
  rare: {
    color: "bg-primary",
    text: "text-primary-foreground", 
    glow: "shadow-civic"
  },
  epic: {
    color: "bg-accent",
    text: "text-accent-foreground",
    glow: "shadow-glow"
  },
  legendary: {
    color: "gradient-civic",
    text: "text-white",
    glow: "badge-glow"
  }
};

export function CitizenBadges() {
  const earnedCount = citizenBadges.filter(badge => badge.earned).length;
  const totalCount = citizenBadges.length;

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Achievements</span>
          </CardTitle>
          <Badge variant="secondary">
            {earnedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Progress */}
          <div className="p-4 gradient-subtle rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((earnedCount / totalCount) * 100)}%
              </span>
            </div>
            <Progress value={(earnedCount / totalCount) * 100} className="h-2" />
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {citizenBadges.map((badge) => {
              const Icon = badge.icon;
              const rarity = rarityConfig[badge.rarity];
              const progressPercent = (badge.progress / badge.maxProgress) * 100;
              
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "border rounded-lg p-4 transition-smooth hover:shadow-card",
                    badge.earned && "border-primary/20 bg-gradient-subtle"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center transition-smooth",
                      rarity.color,
                      rarity.glow,
                      !badge.earned && "opacity-50"
                    )}>
                      <Icon className={cn("h-5 w-5", rarity.text)} />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={cn(
                          "font-medium text-sm",
                          badge.earned ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {badge.name}
                        </h4>
                        {badge.earned && (
                          <Star className="h-3 w-3 text-warning fill-current" />
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                      
                      {!badge.earned && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              {badge.progress}/{badge.maxProgress}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round(progressPercent)}%
                            </span>
                          </div>
                          <Progress value={progressPercent} className="h-1" />
                        </div>
                      )}
                      
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs capitalize",
                          badge.rarity === "legendary" && "gradient-civic text-white",
                          badge.rarity === "epic" && "bg-accent text-accent-foreground"
                        )}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}