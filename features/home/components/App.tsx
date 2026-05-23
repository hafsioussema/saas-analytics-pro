'use client';

import React, { useState, useMemo } from "react";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  UserPlus, 
  Activity, 
  MoreVertical, 
  Download, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Key, 
  ShieldCheck, 
  Plus,
  Circle,
  Mail,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const kpis = [
    { label: "Monthly Recurring Revenue", value: "$128,430", trend: "+12.5%", up: true, icon: DollarSign, color: "text-emerald-400" },
    { label: "Active Customers", value: "12,847", trend: "+4.2%", up: true, icon: Users, color: "text-cyan-400" },
    { label: "Churn Rate", value: "2.4%", trend: "-0.8%", up: false, icon: Activity, color: "text-rose-400" },
    { label: "Average Revenue Per User", value: "$42.50", trend: "+3.1%", up: true, icon: TrendingUp, color: "text-violet-400" },
  ];

  const customersData = [
    { id: 1, name: "Alex Morgan", email: "alex@nexus.io", plan: "Enterprise", mrr: "$1,200", status: "Active", joined: "Jan 12, 2024" },
    { id: 2, name: "Jordan Lee", email: "j.lee@starlight.com", plan: "Pro", mrr: "$299", status: "Active", joined: "Feb 05, 2024" },
    { id: 3, name: "Sam Rivera", email: "sam@flow.dev", plan: "Starter", mrr: "$49", status: "Pending", joined: "Mar 20, 2024" },
    { id: 4, name: "Casey Kim", email: "casey@orbit.net", plan: "Pro", mrr: "$299", status: "Active", joined: "Apr 01, 2024" },
    { id: 5, name: "Riley Chen", email: "r.chen@pulse.app", plan: "Enterprise", mrr: "$2,400", status: "Active", joined: "Apr 15, 2024" },
    { id: 6, name: "Taylor Swift", email: "t.swift@era.co", plan: "Starter", mrr: "$49", status: "Cancelled", joined: "May 10, 2024" },
    { id: 7, name: "Morgan Freeman", email: "morgan@voice.ai", plan: "Pro", mrr: "$299", status: "Active", joined: "Jun 02, 2024" },
    { id: 8, name: "Jamie Vardy", email: "jv@foxes.uk", plan: "Enterprise", mrr: "$1,500", status: "Active", joined: "Jun 22, 2024" },
  ];

  const transactions = [
    { id: "TX-9021", customer: "Alex Morgan", amount: "$1,200.00", date: "2 mins ago", status: "Success" },
    { id: "TX-9020", customer: "Riley Chen", amount: "$2,400.00", date: "45 mins ago", status: "Success" },
    { id: "TX-9019", customer: "Jordan Lee", amount: "$299.00", date: "3 hours ago", status: "Success" },
    { id: "TX-9018", customer: "Taylor Swift", amount: "$49.00", date: "5 hours ago", status: "Failed" },
    { id: "TX-9017", customer: "Jamie Vardy", amount: "$1,500.00", date: "Yesterday", status: "Success" },
  ];

  const filteredCustomers = customersData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NavItem = ({ id, label, icon: Icon }) => {
    const active = activePage === id;
    return (
      <button
        onClick={() => { setActivePage(id); setMobileNavOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          active 
            ? "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20" 
            : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
        }`}
      >
        <Icon size={20} />
        <span className="font-medium text-sm">{label}</span>
      </button>
    );
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-gray-950 border-r border-white/5 p-4 w-64">
      <div className="flex items-center gap-3 px-2 mb-8 mt-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
          <Activity className="text-white" size={18} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Nexus Analytics</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
        <NavItem id="customers" label="Customers" icon={Users} />
        <NavItem id="billing" label="Billing & Plans" icon={CreditCard} />
        <NavItem id="settings" label="Settings" icon={Settings} />
      </nav>

      <div className="mt-auto p-4 rounded-2xl bg-white/[0.03] border border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">Admin Account</p>
          </div>
        </div>
        <button className="w-full py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors">
          Sign Out
        </button>
      </div>
    </aside>
  );

  const DashboardContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl bg-gray-900/40 border border-white/5 p-6 hover:border-cyan-500/20 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gray-800/50 ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                kpi.up ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
              }`}>
                {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-white tabular-nums">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-gray-900/40 border border-white/5 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
              <p className="text-sm text-gray-500">Net revenue vs projected targets</p>
            </div>
            <select className="bg-gray-800 border-none rounded-lg text-xs text-white px-3 py-1.5 focus:ring-1 ring-cyan-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 62, 55, 84, 72, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className="w-full bg-gradient-to-t from-cyan-600/20 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:to-cyan-300"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gray-900/40 border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  tx.status === 'Success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-rose-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{tx.customer}</p>
                  <p className="text-xs text-gray-500">Subscription payment of {tx.amount}</p>
                </div>
                <span className="text-[10px] font-medium text-gray-600 uppercase whitespace-nowrap">{tx.date}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors border-t border-white/5">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );

  const CustomersContent = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Customer Directory</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-200 hover:bg-white/10 transition-all">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
            <UserPlus size={16} /> Add Customer
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900/40 border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between bg-gray-900/60">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:ring-2 ring-cyan-500/40 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">Filter by Status</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800/30 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4 text-right">MRR</th>
                <th className="px-6 py-4 text-right">Joined</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 
                      c.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      <Circle size={8} className="fill-current" />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{c.plan}</span>
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-sm font-medium text-white">
                    {c.mrr}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-500">
                    {c.joined}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-gray-500 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <p>Showing 1 to {filteredCustomers.length} of 240 customers</p>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 text-cyan-400 rounded-lg font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors">3</button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BillingContent = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">Subscription Management</h2>
        <p className="text-gray-500">Manage your workspace plans, billing cycles, and payment methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Starter", price: "$49", features: ["Up to 1,000 users", "Basic Analytics", "Email Support"], current: false },
          { name: "Professional", price: "$299", features: ["Up to 10,000 users", "Advanced Insights", "Priority Support", "API Access"], current: true },
          { name: "Enterprise", price: "Custom", features: ["Unlimited users", "Real-time sync", "Dedicated Manager", "SLA Guarantee"], current: false },
        ].map((plan, i) => (
          <div key={i} className={`relative p-6 rounded-2xl border ${
            plan.current ? "bg-cyan-500/5 border-cyan-500/30 ring-1 ring-cyan-500/20" : "bg-gray-900/40 border-white/5"
          }`}>
            {plan.current && (
              <span className="absolute -top-3 left-6 px-3 py-1 bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                Current Plan
              </span>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-sm text-gray-500">/mo</span>}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle2 size={16} className="text-cyan-500" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
              plan.current 
                ? "bg-white/5 text-gray-400 cursor-default" 
                : "bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
            }`}>
              {plan.current ? "Manage Plan" : "Upgrade Now"}
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-gray-900/40 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Payment Methods</h3>
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded bg-gray-800 flex items-center justify-center border border-white/5">
              <CreditCard size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Visa ending in 4242</p>
              <p className="text-xs text-gray-500">Expiry 12/26 • Default</p>
            </div>
          </div>
          <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">Edit</button>
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-500">Configure your platform preferences and developer tools.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/5 bg-gray-900/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Key size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">API Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Public API Key</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value="pk_live_51M7..." 
                  className="flex-1 bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-300"
                />
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors">Copy</button>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <button className="text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors">Roll API Keys</button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-gray-900/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Team Permissions</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: "John Doe", role: "Owner", email: "john@nexus.io" },
              { name: "Sarah Miller", role: "Developer", email: "sarah@nexus.io" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">{member.role}</span>
                  <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">
              <Plus size={16} /> Invite Team Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const pages = {
    dashboard: <DashboardContent />,
    customers: <CustomersContent />,
    billing: <BillingContent />,
    settings: <SettingsContent />,
  };

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gray-950 text-gray-200">
      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
        mobileNavOpen ? "translate-x-0" : "-translate-x-full"
      } md:flex w-64 shrink-0`}>
        <Sidebar />
      </div>

      <main className="flex-1 min-w-0 flex flex-col h-screen">
        {/* Header */}
        <header className="h-16 shrink-0 border-b border-white/5 bg-gray-950/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileNavOpen(true)}
              className="p-2 md:hidden text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white capitalize hidden sm:block">{activePage}</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Quick search (⌘K)" 
                className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white w-64 focus:outline-none focus:ring-1 ring-cyan-500/50"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            </button>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white">John Doe</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Pro Plan</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 p-[1px]">
                <div className="w-full h-full rounded-[7px] bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {pages[activePage]}
          </div>
          
          <footer className="mt-20 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
            <p>© 2024 Nexus Analytics — Cloud Infrastructure Built for Scale</p>
            <div className="flex items-center gap-6">
              <button className="hover:text-cyan-400 transition-colors">Status: Operational</button>
              <button className="hover:text-cyan-400 transition-colors">Documentation</button>
              <button className="hover:text-cyan-400 transition-colors">Support</button>
            </div>
          </footer>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}