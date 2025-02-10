"use client";

import React, { useState } from 'react';
import { Target, BarChart, TrendingUp } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownParser';


export default function PepsiPromoAnalyzer() {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="gradient-text">
            Promotional Campaign Analysis
          </h1>
          <p className="mt-2 text-gray-600">
            Get AI-powered insights for your Pepsi promotional campaigns.
          </p>
        </div>

        {/* Campaign Details */}
        <div className="modern-card gradient-card">
          <div className="icon-container">
            <Target size={20} />
            <h2 className="section-title">Campaign Details</h2>
          </div>
          <p className="section-description">
            Describe your promotional campaign in detail.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Summer promotion offering 20% off all Pepsi..."
              className="modern-input min-h-[120px]"
            />
            <button 
              type="submit" 
              className="modern-button"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Campaign"}
            </button>
          </form>
        </div>

        {/* Analysis Results */}
        <div className="modern-card gradient-card">
          <div className="icon-container">
            <BarChart size={20} />
            <h2 className="section-title">Analysis Results</h2>
          </div>
          <p className="section-description">
            AI-powered campaign analysis and recommendations
          </p>
          <div className="mt-4 min-h-[120px] border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center">
            {result ? (
              <MarkdownRenderer content={result} />
            ) : (
              <p className="text-gray-400">Submit your campaign to see the analysis</p>
            )}
          </div>
        </div>

        {/* Brand Alignment */}
        <div className="modern-card gradient-card">
          <div className="icon-container">
            <TrendingUp size={20} />
            <h2 className="section-title">Brand Alignment</h2>
          </div>
          <p className="section-description">
            Ensure perfect alignment with Pepsi's guidelines
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {['Brand Voice', 'Visual Identity', 'Target Audience', 'Message'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}