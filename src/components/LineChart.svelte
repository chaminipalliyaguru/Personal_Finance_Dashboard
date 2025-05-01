<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let labels = [];
    export let expenses = [];      
    export let incomes = [];   
  
    let canvas;
    let chart;
  
    onMount(() => {
      if (chart) chart.destroy();
  
      // Set canvas dimensions manually if needed
      canvas.height = 400;
  
      const ctx = canvas.getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Expenses',
              data: expenses,
              borderColor: '#ef4444', // Tailwind red-500
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#ef4444',
            },
            {
              label: 'Incomes',
              data: incomes,
              borderColor: '#10b981', // Tailwind green-500
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#10b981',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow manual sizing
          plugins: {
            legend: {
              labels: {
                color: '#334155'
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#334155' },
              grid: { color: '#e2e8f0' }
            },
            y: {
              ticks: { color: '#334155' },
              grid: { color: '#e2e8f0' }
            }
          }
        }
      });
    });
  </script>
  
  <!-- Tailwind container -->
  <div class="bg-white shadow-md rounded-xl p-4 w-full" style="height: 300px;">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
  </div>
  