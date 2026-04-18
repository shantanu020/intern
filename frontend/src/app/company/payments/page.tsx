"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, Lock, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  { id: "TX-1092", intern: "Aryan Sharma", role: "Frontend Dev (React)", type: "Escrow Deposit", amount: 1500, date: "Oct 24, 2025", status: "Completed" },
  { id: "TX-1091", intern: "Rahul Singh", role: "Growth Sprint", type: "Milestone Release", amount: -400, date: "Oct 22, 2025", status: "Released" },
  { id: "TX-1090", intern: "Sneha Reddy", role: "UI/UX Redesign", type: "Escrow Deposit", amount: 1000, date: "Oct 18, 2025", status: "Completed" },
  { id: "TX-1089", intern: "Aryan Sharma", role: "Frontend Dev (React)", type: "Milestone Release", amount: -300, date: "Oct 15, 2025", status: "Processing" },
  { id: "TX-1088", intern: "Deva Krishnan", role: "Backend Node.js API", type: "Final Release", amount: -800, date: "Oct 10, 2025", status: "Released" },
];

export default function PaymentsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-copy-primary">Escrow & Financials</h1>
          <p className="text-copy-secondary mt-1">Manage intern stipends, milestone releases, and transaction history.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-edge hover:bg-white/10 text-copy-primary text-sm font-semibold rounded-lg transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-light text-white shadow-glow text-sm font-semibold rounded-lg transition-all">
            <Banknote className="w-4 h-4" /> Top up Escrow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-background border-edge">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent-light" />
              </div>
              <Badge variant="default" className="bg-white/5 text-copy-muted border-none">Protected</Badge>
            </div>
            <div className="text-copy-secondary text-sm font-medium mb-1">Total in Escrow</div>
            <div className="text-3xl font-display font-bold text-copy-primary">$3,200.00</div>
          </CardContent>
        </Card>
        
        <Card className="bg-background border-edge">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <Badge variant="default" className="bg-white/5 text-copy-muted border-none">Pending</Badge>
            </div>
            <div className="text-copy-secondary text-sm font-medium mb-1">Next Pending Releases</div>
            <div className="text-3xl font-display font-bold text-copy-primary">$800.00</div>
          </CardContent>
        </Card>

        <Card className="bg-background border-edge">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-3/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent-3" />
              </div>
              <Badge variant="default" className="bg-white/5 text-copy-muted border-none">Lifetime</Badge>
            </div>
            <div className="text-copy-secondary text-sm font-medium mb-1">Total Paid Output</div>
            <div className="text-3xl font-display font-bold text-copy-primary">$12,450.00</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background flex-1 flex flex-col border-edge overflow-hidden">
        <div className="p-5 border-b border-edge">
          <h2 className="text-lg font-display font-bold text-copy-primary">Transaction History</h2>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-background-secondary z-10 text-xs text-copy-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-5 border-b border-edge font-medium">Transaction</th>
                <th className="p-5 border-b border-edge font-medium">Intern</th>
                <th className="p-5 border-b border-edge font-medium">Date</th>
                <th className="p-5 border-b border-edge font-medium">Type</th>
                <th className="p-5 border-b border-edge font-medium text-right">Amount</th>
                <th className="p-5 border-b border-edge font-medium w-32">Status</th>
                <th className="p-5 border-b border-edge border-edge w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge align-middle relative">
              {TRANSACTIONS.map(tx => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        tx.amount > 0 ? "bg-accent/10 text-accent-light" : "bg-white/5 text-copy-muted"
                      )}>
                         {tx.amount > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-copy-primary text-sm font-mono">{tx.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="font-medium text-copy-primary text-sm">{tx.intern}</div>
                    <div className="text-xs text-copy-secondary">{tx.role}</div>
                  </td>
                  <td className="p-5 text-sm text-copy-secondary">{tx.date}</td>
                  <td className="p-5 text-sm text-copy-secondary">{tx.type}</td>
                  <td className="p-5 text-right font-mono font-medium">
                    <span className={tx.amount > 0 ? "text-accent-3" : "text-copy-primary"}>
                      {tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded text-xs font-medium border",
                      tx.status === "Completed" ? "bg-accent-3/10 text-accent-3 border-accent-3/20" :
                      tx.status === "Released" ? "bg-white/10 text-copy-primary border-white/20" :
                      "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="p-1.5 text-copy-muted hover:text-accent bg-transparent hover:bg-white/5 rounded transition-all tooltip-trigger opacity-0 group-hover:opacity-100" title="Download Invoice">
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}
