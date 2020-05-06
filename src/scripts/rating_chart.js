const charts = document.querySelectorAll('.CompanyRatingBlock_chart-value');

charts.forEach(el => el.style.cssText = `width:${el.dataset.value * 10}%`);
