<template>
  <svg viewBox="0 0 460 250" class="w-full human-ai-graph" style="max-width: 480px">
    <!-- axes -->
    <line x1="40" y1="200" x2="440" y2="200" stroke="#888" stroke-width="1.5" />
    <line x1="40" y1="200" x2="40" y2="20" stroke="#888" stroke-width="1.5" />

    <!-- AI alone: fast start, flattens -->
    <path
      d="M 40 192 C 110 120, 170 105, 430 92"
      fill="none"
      stroke="#5b8a9e"
      stroke-width="3"
    />

    <!-- Human with feedback loop: compounds over time -->
    <path
      d="M 40 196 C 200 186, 330 150, 430 32"
      fill="none"
      stroke="#c08552"
      stroke-width="3"
    />

    <!-- labels -->
    <text x="240" y="228" fill="#999" text-anchor="middle">
      time on the project
    </text>
    <text
      x="16"
      y="110"
      fill="#999"
      text-anchor="middle"
      transform="rotate(-90 16 110)"
    >
      value delivered
    </text>
    <text x="360" y="80" fill="#5b8a9e">AI alone</text>
    <text x="260" y="40" fill="#c08552" style="font-weight: bold">
      human + feedback loop
    </text>

    <text x="440" y="245" fill="#666" text-anchor="end" style="font-size: 10px">
      illustrative
    </text>
  </svg>
</template>

<style scoped>
.human-ai-graph text {
  font-size: 13px;
  font-family: inherit;
}
</style>
