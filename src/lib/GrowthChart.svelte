<script lang="ts">
  import * as Card from '$lib/components/ui/card';

  // WHO Length-for-age percentile data (boys, 0-24 months) in cm
  const whoPercentiles = {
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 21, 24],
    p3:  [46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7, 69.9, 71.0, 73.6, 76.0, 78.3, 80.5],
    p15: [47.9, 52.7, 56.4, 59.4, 61.8, 63.8, 65.5, 67.0, 68.4, 69.7, 71.0, 72.2, 73.4, 76.1, 78.6, 81.0, 83.3],
    p50: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7, 78.5, 81.1, 83.5, 85.9],
    p85: [51.8, 56.7, 60.4, 63.5, 66.0, 68.0, 69.8, 71.3, 72.8, 74.2, 75.5, 76.9, 78.0, 81.0, 83.6, 86.1, 88.5],
    p97: [53.7, 58.6, 62.4, 65.5, 68.0, 70.1, 71.9, 73.5, 74.9, 76.4, 77.8, 79.2, 80.3, 83.4, 86.1, 88.7, 91.1]
  };

  // Baby's recorded measurements
  let measurements = $state<{month: number; length: number}[]>([
    { month: 0, length: 55 },
    { month: 1, length: 58 },
    { month: 2, length: 61 }
  ]);

  // Input state
  let newMonth = $state(3);
  let newLength = $state(64);

  // Hover state
  let hoveredPoint = $state<{month: number; length: number; x: number; y: number; isProjection?: boolean} | null>(null);

  // Chart dimensions
  const width = 700;
  const height = 400;
  const padding = { top: 30, right: 50, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  function scaleX(month: number): number {
    return padding.left + (month / 24) * chartWidth;
  }

  function scaleY(length: number): number {
    const minLength = 44;
    const maxLength = 95;
    return padding.top + chartHeight - ((length - minLength) / (maxLength - minLength)) * chartHeight;
  }

  function generatePath(months: number[], lengths: number[]): string {
    return months.map((m, i) => {
      const x = scaleX(m);
      const y = scaleY(lengths[i]);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  }

  const estimation = $derived.by(() => {
    if (measurements.length < 2) return [];

    const n = measurements.length;
    const sumX = measurements.reduce((a, d) => a + d.month, 0);
    const sumY = measurements.reduce((a, d) => a + d.length, 0);
    const sumXY = measurements.reduce((a, d) => a + d.month * d.length, 0);
    const sumX2 = measurements.reduce((a, d) => a + d.month * d.month, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const lastMonth = measurements[measurements.length - 1].month;
    const points: {month: number; length: number}[] = [];

    for (let m = lastMonth; m <= 24; m += 1) {
      const ageAdjust = Math.max(0.4, 1 - (m - lastMonth) * 0.03);
      const estimatedLength = intercept + slope * m * ageAdjust + (1 - ageAdjust) * slope * lastMonth;
      points.push({ month: m, length: Math.max(0, estimatedLength) });
    }

    return points;
  });

  function addMeasurement() {
    if (newMonth >= 0 && newMonth <= 24 && newLength > 0) {
      measurements = [...measurements, { month: newMonth, length: newLength }]
        .sort((a, b) => a.month - b.month);
      newMonth = Math.min(24, measurements[measurements.length - 1].month + 1);
    }
  }

  function removeMeasurement(index: number) {
    measurements = measurements.filter((_, i) => i !== index);
  }

  const yTicks = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  const xTicks = [0, 3, 6, 9, 12, 15, 18, 21, 24];

  // Dress sizes (Italian/EU sizing)
  const dressSizes = [
    { name: '1-3', minLength: 55, maxLength: 56, color: 'rgb(151, 191, 36)' },  // amber
    { name: '3-6', minLength: 56, maxLength: 62, color: 'rgb(231, 141, 16)' },  // amber
    { name: '6-9', minLength: 62, maxLength: 68, color: 'rgb(171, 191, 36)' },  // amber
    { name: '9-12', minLength: 68, maxLength: 76, color: 'rgb(251, 191, 36)' },  // amber
    { name: '12-18', minLength: 76, maxLength: 83, color: 'rgb(251, 146, 60)' }, // orange
    { name: '18-24', minLength: 83, maxLength: 89, color: 'rgb(248, 113, 113)' }, // red
    { name: '24-36', minLength: 89, maxLength: 96, color: 'rgb(192, 132, 252)' }, // purple
  ];

  // Get size for a given length
  function getSizeForLength(length: number) {
    for (const size of dressSizes) {
      if (length >= size.minLength && length < size.maxLength) {
        return size;
      }
    }
    if (length < dressSizes[0].minLength) return { name: 'Under 9-12', minLength: 0, maxLength: dressSizes[0].minLength, color: 'rgb(156, 163, 175)' };
    return dressSizes[dressSizes.length - 1];
  }

  // Get current size based on latest measurement
  const currentSize = $derived.by(() => {
    const lastMeasurement = measurements[measurements.length - 1];
    if (!lastMeasurement) return null;
    return getSizeForLength(lastMeasurement.length);
  });

  // Calculate when baby will reach each size based on projection
  const sizeProjections = $derived.by(() => {
    if (estimation.length < 2) return [];

    const projections: {size: typeof dressSizes[0]; month: number}[] = [];

    for (const size of dressSizes) {
      // Find the first month where baby reaches this size's minimum length
      const reachPoint = estimation.find(p => p.length >= size.minLength);
      if (reachPoint) {
        projections.push({ size, month: reachPoint.month });
      }
    }

    return projections;
  });
</script>

<div class="w-full max-w-4xl mx-auto p-4">
  <Card.Root>
    <Card.Header>
      <Card.Title>Baby Growth Chart - Length (Boys, 0-24 months)</Card.Title>
      <Card.Description>WHO Growth Standards for Boys with Growth Estimation</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="relative">
        <svg {width} {height} class="w-full h-auto bg-card rounded-lg">
          <!-- Grid lines -->
          {#each yTicks as tick (tick)}
            <line
              x1={padding.left}
              y1={scaleY(tick)}
              x2={width - padding.right}
              y2={scaleY(tick)}
              class="stroke-border"
              stroke-width="1"
            />
          {/each}
          {#each xTicks as tick (tick)}
            <line
              x1={scaleX(tick)}
              y1={padding.top}
              x2={scaleX(tick)}
              y2={height - padding.bottom}
              class="stroke-border"
              stroke-width="1"
            />
          {/each}

          <!-- Dress size bands -->
          {#each dressSizes as size (size.name)}
            <rect
              x={padding.left}
              y={scaleY(size.maxLength)}
              width={chartWidth}
              height={scaleY(size.minLength) - scaleY(size.maxLength)}
              fill={size.color}
              opacity="0.1"
            />
            <line
              x1={padding.left}
              y1={scaleY(size.minLength)}
              x2={width - padding.right}
              y2={scaleY(size.minLength)}
              stroke={size.color}
              stroke-width="1.5"
              stroke-dasharray="8 4"
              opacity="0.6"
            />
            <text
              x={padding.left + 5}
              y={scaleY((size.minLength + size.maxLength) / 2) + 4}
              font-size="11"
              font-weight="500"
              fill={size.color}
              opacity="0.8"
            >Taglia {size.name}</text>
          {/each}

          <!-- WHO Percentile curves -->
          <path d={generatePath(whoPercentiles.months, whoPercentiles.p3)} fill="none" class="stroke-muted-foreground/40" stroke-width="1.5" stroke-dasharray="4 4" />
          <path d={generatePath(whoPercentiles.months, whoPercentiles.p15)} fill="none" class="stroke-muted-foreground/30" stroke-width="1.5" stroke-dasharray="4 4" />
          <path d={generatePath(whoPercentiles.months, whoPercentiles.p50)} fill="none" class="stroke-muted-foreground" stroke-width="2" />
          <path d={generatePath(whoPercentiles.months, whoPercentiles.p85)} fill="none" class="stroke-muted-foreground/30" stroke-width="1.5" stroke-dasharray="4 4" />
          <path d={generatePath(whoPercentiles.months, whoPercentiles.p97)} fill="none" class="stroke-muted-foreground/40" stroke-width="1.5" stroke-dasharray="4 4" />

          <!-- Percentile labels -->
          <text x={width - padding.right + 5} y={scaleY(whoPercentiles.p3[whoPercentiles.p3.length - 1]) + 4} font-size="10" class="fill-muted-foreground">3rd</text>
          <text x={width - padding.right + 5} y={scaleY(whoPercentiles.p50[whoPercentiles.p50.length - 1]) + 4} font-size="10" class="fill-muted-foreground">50th</text>
          <text x={width - padding.right + 5} y={scaleY(whoPercentiles.p97[whoPercentiles.p97.length - 1]) + 4} font-size="10" class="fill-muted-foreground">97th</text>

          <!-- Estimation line -->
          {#if estimation.length > 1}
            <path
              d={generatePath(estimation.map(p => p.month), estimation.map(p => p.length))}
              fill="none"
              class="stroke-green-500"
              stroke-width="2.5"
              stroke-dasharray="6 3"
              opacity="0.8"
            />
            <!-- Projection points (every month) -->
            {#each estimation.filter(p => p.month > measurements[measurements.length - 1]?.month) as point (point.month)}
              <circle
                cx={scaleX(point.month)}
                cy={scaleY(point.length)}
                r={hoveredPoint?.month === point.month && hoveredPoint?.isProjection ? 7 : 5}
                class="fill-green-500/80 stroke-white cursor-pointer transition-all duration-150"
                stroke-width="2"
                role="img"
                aria-label="Projected Month {point.month}: {point.length.toFixed(1)} cm"
                onmouseenter={() => hoveredPoint = { month: point.month, length: point.length, x: scaleX(point.month), y: scaleY(point.length), isProjection: true }}
                onmouseleave={() => hoveredPoint = null}
              />
            {/each}
          {/if}

          <!-- Baby's actual measurements -->
          <path
            d={generatePath(measurements.map(m => m.month), measurements.map(m => m.length))}
            fill="none"
            class="stroke-blue-500"
            stroke-width="3"
          />
          {#each measurements as point (point.month)}
            <circle
              cx={scaleX(point.month)}
              cy={scaleY(point.length)}
              r={hoveredPoint?.month === point.month ? 9 : 7}
              class="fill-blue-500 stroke-white cursor-pointer transition-all duration-150"
              stroke-width="2.5"
              role="img"
              aria-label="Month {point.month}: {point.length} cm"
              onmouseenter={() => hoveredPoint = { ...point, x: scaleX(point.month), y: scaleY(point.length) }}
              onmouseleave={() => hoveredPoint = null}
            />
          {/each}

          <!-- Axes -->
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} class="stroke-foreground" stroke-width="2" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} class="stroke-foreground" stroke-width="2" />

          <!-- Y-axis labels -->
          {#each yTicks as tick (tick)}
            <text x={padding.left - 10} y={scaleY(tick) + 4} text-anchor="end" font-size="12" class="fill-muted-foreground">{tick}</text>
          {/each}
          <text x={20} y={height / 2} transform="rotate(-90, 20, {height / 2})" text-anchor="middle" font-size="13" class="fill-foreground font-medium">Length (cm)</text>

          <!-- X-axis labels -->
          {#each xTicks as tick (tick)}
            <text x={scaleX(tick)} y={height - padding.bottom + 20} text-anchor="middle" font-size="12" class="fill-muted-foreground">{tick}</text>
          {/each}
          <text x={width / 2} y={height - 10} text-anchor="middle" font-size="13" class="fill-foreground font-medium">Age (months)</text>
        </svg>

        <!-- Tooltip -->
        {#if hoveredPoint}
          {@const pointSize = getSizeForLength(hoveredPoint.length)}
          <div
            class="absolute pointer-events-none px-3 py-2 rounded-lg shadow-lg border text-sm {hoveredPoint.isProjection ? 'bg-green-50 border-green-200 text-green-900' : 'bg-popover text-popover-foreground'}"
            style="left: {hoveredPoint.x + 15}px; top: {hoveredPoint.y - 50}px;"
          >
            <div class="font-semibold">
              {#if hoveredPoint.isProjection}
                Projected - Month {hoveredPoint.month}
              {:else}
                Month {hoveredPoint.month}
              {/if}
            </div>
            <div>{hoveredPoint.isProjection ? hoveredPoint.length.toFixed(1) : hoveredPoint.length} cm</div>
            <div class="mt-1 pt-1 border-t flex items-center gap-1.5">
              <div class="w-2 h-2 rounded" style="background-color: {pointSize.color}"></div>
              <span class="font-medium">Taglia {pointSize.name}</span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-6 h-0.5 bg-blue-500 rounded"></div>
          <span class="text-muted-foreground">Baby's Length</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-0.5 rounded" style="background: repeating-linear-gradient(90deg, rgb(34 197 94) 0, rgb(34 197 94) 4px, transparent 4px, transparent 8px)"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-white"></div>
          <span class="text-muted-foreground">Growth Projection</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-0.5 bg-muted-foreground rounded"></div>
          <span class="text-muted-foreground">WHO 50th</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-0.5 rounded" style="background: repeating-linear-gradient(90deg, rgb(161 161 170) 0, rgb(161 161 170) 4px, transparent 4px, transparent 8px)"></div>
          <span class="text-muted-foreground">WHO 3rd/97th</span>
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Dress Size Estimation -->
  <Card.Root class="mt-6">
    <Card.Header>
      <Card.Title class="text-lg">Dress Size Estimation</Card.Title>
      <Card.Description>Based on current measurements and growth projection</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4 sm:grid-cols-2">
        <!-- Current Size -->
        <div class="p-4 rounded-lg bg-muted">
          <div class="text-sm text-muted-foreground mb-1">Current Size</div>
          {#if currentSize}
            <div class="text-2xl font-bold" style="color: {currentSize.color}">
              Taglia {currentSize.name}
            </div>
            <div class="text-sm text-muted-foreground mt-1">
              {measurements[measurements.length - 1]?.length} cm at month {measurements[measurements.length - 1]?.month}
            </div>
          {:else}
            <div class="text-muted-foreground">No measurements</div>
          {/if}
        </div>

        <!-- Size Projections -->
        <div class="p-4 rounded-lg bg-muted">
          <div class="text-sm text-muted-foreground mb-2">Projected Size Changes</div>
          {#if sizeProjections.length > 0}
            <div class="space-y-2">
              {#each sizeProjections.filter(p => p.month > measurements[measurements.length - 1]?.month) as proj (proj.size.name)}
                <div class="flex items-center justify-between text-sm">
                  <span class="font-medium" style="color: {proj.size.color}">Taglia {proj.size.name}</span>
                  <span class="text-muted-foreground">~ month {proj.month}</span>
                </div>
              {/each}
              {#if sizeProjections.filter(p => p.month > measurements[measurements.length - 1]?.month).length === 0}
                <div class="text-sm text-muted-foreground">Add more measurements for projections</div>
              {/if}
            </div>
          {:else}
            <div class="text-sm text-muted-foreground">Add more measurements for projections</div>
          {/if}
        </div>
      </div>

      <!-- Size Reference -->
      <div class="mt-4 pt-4 border-t">
        <div class="text-sm text-muted-foreground mb-2">Size Reference</div>
        <div class="flex flex-wrap gap-3">
          {#each dressSizes as size (size.name)}
            <div class="flex items-center gap-2 text-sm">
              <div class="w-3 h-3 rounded" style="background-color: {size.color}; opacity: 0.7"></div>
              <span><strong>{size.name}</strong>: {size.minLength}-{size.maxLength} cm</span>
            </div>
          {/each}
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Controls -->
  <Card.Root class="mt-6">
    <Card.Header>
      <Card.Title class="text-lg">Add Measurement</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-wrap gap-4 items-end">
        <label class="flex flex-col gap-1.5">
          <span class="text-sm text-muted-foreground">Month</span>
          <input
            type="number"
            bind:value={newMonth}
            min="0"
            max="24"
            step="1"
            class="w-24 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label class="flex flex-col gap-1.5">
          <span class="text-sm text-muted-foreground">Length (cm)</span>
          <input
            type="number"
            bind:value={newLength}
            min="0"
            max="100"
            step="0.5"
            class="w-24 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <button
          onclick={addMeasurement}
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          Add
        </button>
      </div>

      <div class="mt-6">
        <h4 class="text-sm font-medium mb-3">Recorded Measurements</h4>
        <div class="flex flex-wrap gap-2">
          {#each measurements as m, i (m.month)}
            <div class="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-sm">
              <span>Month {m.month}: {m.length} cm</span>
              <button
                onclick={() => removeMeasurement(i)}
                class="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                ×
              </button>
            </div>
          {/each}
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</div>
