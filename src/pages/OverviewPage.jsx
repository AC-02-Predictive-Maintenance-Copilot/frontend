import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeaderText from "@/components/HeaderText";
import StatCard from "@/components/StatCard";
import { useOverview } from "@/hooks/useOverview";
import { 
  Server, 
  Ticket, 
  AlertTriangle, 
  Users, 
  Activity, 
  MessageSquare,
  Clock,
  RefreshCw
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Cell, Pie, PieChart, Legend } from "recharts";

function OverviewPage() {
  const navigate = useNavigate();
  const { overview, isLoading, error, refetch } = useOverview();

  // Warna chart
  const COLORS = useMemo(() => ({
    open: "#3b82f6",       // biru
    inProgress: "#f59e0b", // kuning
    resolved: "#22c55e",   // hijau
    low: "#22c55e",        // hijau
    medium: "#eab308",     // kuning
    high: "#ef4444",       // merah
  }), []);

  // Chart data for ticket status
  const ticketStatusChartData = useMemo(() => [
    { name: "Open", value: overview?.tickets?.status?.open || 0, fill: COLORS.open },
    { name: "In Progress", value: overview?.tickets?.status?.inProgress || 0, fill: COLORS.inProgress },
    { name: "Resolved", value: overview?.tickets?.status?.resolved || 0, fill: COLORS.resolved },
  ], [overview, COLORS]);

  const ticketStatusChartConfig = {
    open: { label: "Open", color: COLORS.open },
    inProgress: { label: "In Progress", color: COLORS.inProgress },
    resolved: { label: "Resolved", color: COLORS.resolved },
  };

  // Chart data for ticket priority
  const ticketPriorityChartData = useMemo(() => [
    { name: "Low", value: overview?.tickets?.priority?.low || 0, fill: COLORS.low },
    { name: "Medium", value: overview?.tickets?.priority?.medium || 0, fill: COLORS.medium },
    { name: "High", value: overview?.tickets?.priority?.high || 0, fill: COLORS.high },
  ], [overview, COLORS]);

  const ticketPriorityChartConfig = {
    low: { label: "Low", color: COLORS.low },
    medium: { label: "Medium", color: COLORS.medium },
    high: { label: "High", color: COLORS.high },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get priority badge variant
  const getPriorityVariant = (priority) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return "destructive";
      case "MEDIUM":
        return "warning";
      case "LOW":
        return "success";
      default:
        return "secondary";
    }
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return "default";
      case "IN_PROGRESS":
        return "warning";
      case "RESOLVED":
        return "success";
      default:
        return "secondary";
    }
  };

  if (error) {
    return (
      <div className="flex-1 w-full p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
              <p className="text-destructive font-medium">Failed to load overview data</p>
              <p className="text-muted-foreground text-sm">{error}</p>
              <Button onClick={refetch} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex-1 w-full p-6 overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <HeaderText
            title="Overview"
            subtitle="Track and analyze your machines data"
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refetch}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Main Stat Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Machines"
              value={overview?.machines?.total || 0}
              icon={Server}
              description={`${overview?.machines?.anomaly || 0} anomaly detected`}
              variant="info"
              isLoading={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Tickets"
              value={overview?.tickets?.total || 0}
              icon={Ticket}
              description={`${overview?.tickets?.active || 0} active tickets`}
              variant="default"
              isLoading={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Users"
              value={overview?.users?.total || 0}
              icon={Users}
              description={`${overview?.users?.admin || 0} admin, ${overview?.users?.engineer || 0} engineer`}
              variant="success"
              isLoading={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Health Score"
              value={`${Math.round(overview?.health?.avgScore || 0)}%`}
              icon={Activity}
              description={`${overview?.health?.failuresDetected || 0} failures detected`}
              variant={
                (overview?.health?.avgScore || 0) >= 80 
                  ? "success" 
                  : (overview?.health?.avgScore || 0) >= 50 
                    ? "warning" 
                    : "danger"
              }
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Secondary Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Anomaly Machines"
              value={overview?.machines?.anomaly || 0}
              icon={AlertTriangle}
              description={`${overview?.machines?.noStatus || 0} without status`}
              variant={(overview?.machines?.anomaly || 0) > 0 ? "danger" : "success"}
              isLoading={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Unverified Users"
              value={overview?.users?.unverified || 0}
              icon={Users}
              description="Pending verification"
              variant={(overview?.users?.unverified || 0) > 0 ? "warning" : "success"}
              isLoading={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Chat Messages"
              value={overview?.messages?.total || 0}
              icon={MessageSquare}
              description="Total conversations"
              variant="info"
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ticket by Status - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tickets by Status</CardTitle>
                <CardDescription>Distribution of ticket statuses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[280px] flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">Loading chart...</div>
                  </div>
                ) : (overview?.tickets?.total || 0) === 0 ? (
                  <div className="h-[280px] flex items-center justify-center">
                    <p className="text-muted-foreground">No tickets data available</p>
                  </div>
                ) : (
                  <ChartContainer config={ticketStatusChartConfig} className="h-[280px] w-full">
                    <PieChart>
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={false}
                      />
                      <Pie
                        data={ticketStatusChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={80}
                        innerRadius={50}
                        paddingAngle={3}
                        strokeWidth={2}
                        stroke="hsl(var(--background))"
                      >
                        {ticketStatusChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill}
                          />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value, entry) => (
                          <span className="text-foreground text-sm ml-1">
                            {value} ({entry.payload.value})
                          </span>
                        )}
                      />
                    </PieChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Ticket by Priority - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tickets by Priority</CardTitle>
                <CardDescription>Distribution of ticket priorities</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[280px] flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">Loading chart...</div>
                  </div>
                ) : (overview?.tickets?.total || 0) === 0 ? (
                  <div className="h-[280px] flex items-center justify-center">
                    <p className="text-muted-foreground">No tickets data available</p>
                  </div>
                ) : (
                  <ChartContainer config={ticketPriorityChartConfig} className="h-[280px] w-full">
                    <BarChart 
                      data={ticketPriorityChartData} 
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                    >
                      <XAxis 
                        type="number" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={70}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 500 }}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 6, 6, 0]}
                        barSize={32}
                      >
                        {ticketPriorityChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Tickets</CardTitle>
                  <CardDescription>Latest maintenance tickets created</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/tickets/view")}
                  className="hover: cursor-pointer"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : !overview?.recent?.tickets?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No recent tickets
                </div>
              ) : (
                <div className="space-y-3">
                  {overview.recent.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{ticket.id}</span>
                          <Badge variant={getStatusVariant(ticket.status)} className="text-xs">
                            {ticket.status?.replace("_", " ")}
                          </Badge>
                          <Badge variant={getPriorityVariant(ticket.priority)} className="text-xs">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {ticket.problem}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs ml-4">
                        <Clock className="h-3 w-3" />
                        {formatDate(ticket.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default OverviewPage;
