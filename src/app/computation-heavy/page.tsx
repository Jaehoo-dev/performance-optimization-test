"use client";

import { useState, useMemo, Profiler, useEffect } from "react";
import React from "react";
import { match } from "ts-pattern";

export default function ComputationHeavyPage() {
  const [topState, setTopState] = useState(0);
  const [count, setCount] = useState(30);
  const [renderTime, setRenderTime] = useState(0);
  const [type, setType] = useState<"UNOPTIMIZED" | "useMemo">("UNOPTIMIZED");

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <h1 className="text-2xl font-semibold">
        Rendering Computation-Heavy Components
      </h1>
      <label className="flex items-center gap-2">
        <span>Top state:</span>
        <input
          type="number"
          value={topState}
          onChange={(e) => setTopState(Number(e.target.value))}
          className="border px-2 py-1 w-20 rounded"
          min="1"
          max="40"
        />
      </label>
      <label className="flex items-center gap-2">
        <span>Type:</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "UNOPTIMIZED" | "useMemo")}
          className="border p-2 w-40 rounded"
        >
          <option value="UNOPTIMIZED">Unoptimized</option>
          <option value="useMemo">useMemo</option>
          <option value="React.memo">React.memo</option>
        </select>
      </label>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <span>Fibonacci number to calculate:</span>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="border px-2 py-1 w-20 rounded"
            min="1"
            max="40"
          />
        </label>
      </div>
      {match(type)
        .with("UNOPTIMIZED", () => (
          <RegularProfiler num={count} onRender={setRenderTime} />
        ))
        .with("useMemo", () => (
          <UseMemoProfiler num={count} onRender={setRenderTime} />
        ))
        .exhaustive()}
      <p className="text-blue-600 font-semibold">
        Render time: {renderTime.toFixed(2)}ms
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => {
          setRenderTime(0);
          setCount((prev) => prev);
        }}
      >
        Force Re-render
      </button>
    </div>
  );
}

function RegularProfiler({
  num,
  onRender,
}: {
  num: number;
  onRender: (time: number) => void;
}) {
  return (
    <Profiler
      id="RegularFibProfiler"
      onRender={(_, __, actualDuration) => {
        onRender(actualDuration);
      }}
    >
      <FibonacciResult num={num} />
    </Profiler>
  );
}

function UseMemoProfiler({
  num,
  onRender,
}: {
  num: number;
  onRender: (time: number) => void;
}) {
  const timeRef = React.useRef(0);

  const result = useMemo(() => {
    const start = performance.now();
    const value = calculateFibonacci(num);
    const end = performance.now();
    timeRef.current = end - start;
    return value;
  }, [num]);

  useEffect(() => {
    onRender(timeRef.current);
  }, [result, onRender]);

  return <p className="font-semibold">Result: {result}</p>;
}

function FibonacciResult({ num }: { num: number }) {
  const result = calculateFibonacci(num);

  return <p className="font-semibold">Result: {result}</p>;
}

function calculateFibonacci(n: number): number {
  if (n <= 1) return n;

  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}
