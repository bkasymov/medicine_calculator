function calculateRisk() {
    let totalScore = 0;
    const riskFactors = document.querySelectorAll('.riskFactor:checked');
    riskFactors.forEach(factor => totalScore += parseInt(factor.value));

    let riskLevel = '';
    let recommendations = '';

    if (totalScore >= 4) {
        riskLevel = 'Высокий риск';
        recommendations = 'Рассмотреть возможность тромбопрофилактики с 1 триместра';
    } else if (totalScore === 3) { // TODO check scores
        riskLevel = 'Повышенный риск';
        recommendations = 'Рассмотреть возможность тромбопрофилактики с 28 недели';
    } else if (totalScore >= 2) {
        riskLevel = 'Промежуточный риск';
        recommendations = 'Рассмотреть возможность тромбопрофилактики продолжительностью, по меньшей мере, 10 дней';
    } else {
        riskLevel = 'Низкий риск';
        recommendations = ' ?? Мобилизация и избегание дегидратации'; // TODO check recommendation
    }

    document.getElementById('result').innerHTML = `Общий балл: ${totalScore}.<br>Уровень риска: <strong>${riskLevel}</strong>.<br>Рекомендации: ${recommendations}`;

    // Отображение таблицы дозировки
    const doseTable = `
        <h3>Расчет режима дозирования НМГ для профилактики ВТЭО</h3>
        <table>
            <tr>
                <th>Профилактические дозы</th>
                <th>Масса тела до беременности</th>
                <th>Эноксапарин натрия</th>
                <th>Надропарин кальция</th>
            </tr>
            <tr>
                <td>2 балла: постнатально (10 дней)</td>
                <td><50 кг</td>
                <td>20 мг (0,2 мл)</td>
                <td>2850 ME (0,3 мл)</td>
            </tr>
            <tr>
                <td rowspan="3">≥3 баллов: (антенатально) и постнатально (6 недель)</td>
                <td>50-90 кг</td>
                <td>40 мг (0,4 мл)</td>
                <td>5700 ME (0,6 мл)</td>
            </tr>
            <tr>
                <td>91-130 кг</td>
                <td>60 мг (0,6 мл)</td>
                <td>7600 ME (0,8 мл)</td>
            </tr>
            <tr>
                <td>Более 130 кг</td>
                <td>0,6 мг/кг/сутки</td>
                <td>86 ЕД/кг/сутки</td>
            </tr>
        </table>
    `;
    document.getElementById('doseResult').innerHTML = doseTable;
}

function calculateDosage() {
    const weight = parseFloat(document.getElementById('weight').value);
    let enoxaparin = '';
    let nadroparin = '';

    if (weight < 50) {
        enoxaparin = '20 мг (0,2 мл)';
        nadroparin = '2850 ME (0,3 мл)';
    } else if (weight >= 50 && weight <= 90) {
        enoxaparin = '40 мг (0,4 мл)';
        nadroparin = '5700 ME (0,6 мл)';
    } else if (weight > 90 && weight <= 130) {
        enoxaparin = '60 мг (0,6 мл)';
        nadroparin = '7600 ME (0,8 мл)';
    } else {
        enoxaparin = `${(0.6 * weight).toFixed(1)} мг/кг/сутки`;
        nadroparin = `${Math.round(86 * weight)} ЕД/кг/сутки`;
    }

    const resultHTML = `
        <h3>Рекомендуемая дозировка:</h3>
        <p>Эноксапарин натрия: ${enoxaparin}</p>
        <p>Надропарин кальция: ${nadroparin}</p>
    `;

    document.getElementById('dosageResult').innerHTML = resultHTML;
}