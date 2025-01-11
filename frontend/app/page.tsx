"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { LockClosedIcon, RocketIcon, TargetIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-[#004B93] via-[#0066CC] to-[#E31837] rounded-full flex items-center justify-center">
              <span className="font-bold text-white text-sm">P</span>
            </div>
            <span className="font-semibold text-xl">Pepsi Promo Copilot</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-12 space-y-4">
          <h1 className="text-4xl font-bold gradient-text">
            Promotional Campaign Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get AI-powered insights for your Pepsi promotional campaigns
          </p>
        </div>

        {/* Alert */}
        <Alert className="max-w-2xl mx-auto mb-8 pepsi-card">
          <LockClosedIcon className="h-4 w-4" />
          <AlertTitle>Powered by Advanced AI</AlertTitle>
          <AlertDescription>
            Our AI analyzes your promotional campaigns against Pepsi's brand guidelines and market trends
          </AlertDescription>
        </Alert>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Card */}
          <Card className="gradient-border shadow-lg">
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold gradient-text">Campaign Details</h2>
                  <p className="text-sm text-gray-500">
                    Describe your promotional campaign in detail
                  </p>
                  <Textarea
                    placeholder="E.g., Summer promotion offering 20% off on all Pepsi products with special gaming-themed packaging..."
                    className="min-h-[200px] p-4 resize-none border-2 focus:border-[#004B93] transition-all duration-300"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full pepsi-button text-white h-12 text-lg"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze Campaign →"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="gradient-border shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold gradient-text">Analysis Results</h2>
              <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] border-2 border-[#004B93]/10">
                {result ? (
                  <div className="prose max-w-none">
                    <p className="text-gray-800">{result}</p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 text-center">
                    <p>Submit your campaign details to see the analysis</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
          <Card className="pepsi-card">
            <CardContent className="p-6 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-[#004B93]/10 flex items-center justify-center">
                <TargetIcon className="h-5 w-5 text-[#004B93]" />
              </div>
              <h3 className="text-lg font-semibold gradient-text">Brand Alignment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ensure your campaigns align perfectly with Pepsi's brand guidelines and values
              </p>
            </CardContent>
          </Card>

          <Card className="pepsi-card">
            <CardContent className="p-6 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-[#004B93]/10 flex items-center justify-center">
                <div className="h-5 w-5 text-[#004B93]">📊</div>
              </div>
              <h3 className="text-lg font-semibold gradient-text">Market Analysis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get real-time insights on market trends and competitor strategies
              </p>
            </CardContent>
          </Card>

          <Card className="pepsi-card">
            <CardContent className="p-6 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-[#004B93]/10 flex items-center justify-center">
                <RocketIcon className="h-5 w-5 text-[#004B93]" />
              </div>
              <h3 className="text-lg font-semibold gradient-text">ROI Optimization</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maximize campaign effectiveness with data-driven recommendations
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
