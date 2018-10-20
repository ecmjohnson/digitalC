function add_liquid_gauge(svg_settings, id, init_val, config = 0)
{
    // Create the svg for the liquid fill gauge
    var svg = d3.select("body").append("svg");
    svg_settings.forEach(setting => {
        svg.attr(setting[0], setting[1]);
    });
    svg.attr("id", id);

    // Configure the default fill gauge settings, if not provided
    if (config === 0) {
        var liqConfig = liquidFillGaugeDefaultSettings();
        liqConfig.circleThickness = 0.1;
        liqConfig.circleFillGap = 0.1;
        liqConfig.textVertPosition = 0.8;
        liqConfig.waveAnimateTime = 2000;
        liqConfig.waveHeight = 0.2;
        liqConfig.waveCount = 1;
    }

    // Create and return the liquid gauge
    return loadLiquidFillGauge(id, init_val, liqConfig);
}

function update_liquid_gauge(liquid_gauge, new_val)
{
    liquid_gauge.update(new_val);
}