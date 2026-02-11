<script lang="ts">
  import { add, LineChart } from "layerchart";
  import { scaleUtc } from "d3-scale";
  import { curveNatural } from "d3-shape";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { add as addDate } from "date-fns";

  const birthDate = new Date("2025-12-11");

  const measurements = [
    { month: 0, length: 55 },
    { month: 1, length: 58 },
    { month: 2, length: 62 },
  ];

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
    const points: { date: Date; month: number; length: number }[] = [];

    for (let m = lastMonth; m <= 24; m += 1) {
      const ageAdjust = Math.max(0.4, 1 - (m - lastMonth) * 0.03);
      const estimatedLength =
        intercept + slope * m * ageAdjust + (1 - ageAdjust) * slope * lastMonth;
      points.push({
        date: addDate(birthDate, { months: m }),
        month: m,
        length: Math.max(0, estimatedLength),
      });
    }

    return points;
  });

  const chartData = $derived.by(() =>
    Array.from(Array(24), (x, i) => i).map((month) => {
      return {
        date: addDate(birthDate, { months: month }),
        length: measurements[month]?.length,
        estimate: estimation[month]?.length,
      };
    }),
  );

  const chartConfig = {
    length: { label: "length", color: "red" },
    estimate: { label: "estimate", color: "green" },
  } satisfies Chart.ChartConfig;
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Line Chart - Label</Card.Title>
    <Card.Description
      >Showing total visitors for the last 6 months</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <Chart.Container config={chartConfig}>
      <LineChart
        points={{ r: 4 }}
        labels={{ offset: 12 }}
        data={chartData}
        x="date"
        axis="x"
        xScale={scaleUtc()}
        series={[
          {
            key: "length",
            label: "length",
            color: chartConfig.length.color,
          },
          {
            key: "estimate",
            label: "estimate",
            color: chartConfig.estimate.color,
          },
        ]}
        props={{
          spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
          highlight: {
            points: {
              motion: "none",
              r: 6,
            },
          },
          xAxis: {
            format: (v: Date) =>
              v.toLocaleDateString("en-US", { month: "short" }),
          },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip
            let:data
            labelFormatter={(v: Date) => {
              return v.toLocaleDateString("en-US", {
                month: "long",
                year: "2-digit",
              });
            }}
            indicator="line"
          >
            <div>
              <strong>{data.label}</strong><br />
              Value: {data.y}<br />
              Category: {data.category}<br />
              {data.description}
            </div>
          </Chart.Tooltip>
        {/snippet}
      </LineChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer>
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 leading-none font-medium"></div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </div>
    </div>
  </Card.Footer>
</Card.Root>
