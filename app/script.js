function calculateRisk() {
    let totalScore = 0;
    const riskFactors = document.querySelectorAll('.riskFactor:checked');
    riskFactors.forEach(factor => totalScore += parseInt(factor.value));

    let riskLevel = '';
    let recommendations = '';

    if (totalScore >= 4) {
        riskLevel = 'Высокий риск';
        recommendations = 'Рассмотреть возможность тромбопрофилактики с 1 триместра';
    } else if (totalScore >= 3) {
        riskLevel = 'Повышенный риск';
        recommendations = 'Рассмотреть возможность тромбопрофилактики с 28 недель';
    } else if (totalScore >= 2) {
        riskLevel = 'Промежуточный риск';
        recommendations = 'Рассмотреть возможность тромбопрофилактики продолжительностью, по меньшей мере, 10 дней после родов';
    } else {
        riskLevel = 'Низкий риск';
        recommendations = 'Мобилизация и избегание дегидратации';
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
