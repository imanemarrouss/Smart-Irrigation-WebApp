import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polyline, Line, Text as SvgText, Rect } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const Chart = ({
  data,
  maxValue,
  minValue,
  slotsPerWidth,
  width,
  height,
  marginBottom,
  lineColor,
  lineThickness,
  chartBackground,
  horizontalGridLinesCount,
  gridColor,
  gridThickness,
  unit,
  axisTooClose,
  labelsColor,
  labelsFontSize,
  marginLeft,
  labelsMarginLeft
}) => {
  const slotWidth = width / slotsPerWidth;
  const netHeight = height - marginBottom;

  const convertArrayToPolylinePoints = () => {
    let polylinePoints = '';

    if (!data.length) {
      return polylinePoints;
    }

    for (let i = 0; i < data.length; i++) {
      const Y = Math.ceil(
        height -
          (height * Math.abs(data[i] - minValue)) / Math.abs(maxValue - minValue),
      );

      polylinePoints += `${slotWidth * i + marginLeft},${Y}`;

      if (i < data.length - 1) {
        polylinePoints += ' ';
      }
    }

    return polylinePoints;
  };

  const spaceBetweenHorizontalGridLines = Math.floor(
    netHeight / (horizontalGridLinesCount + 1),
  );

  const deltaValuesBetweenHorizontalGridLines = Math.floor(
    Math.abs(maxValue - minValue) / (horizontalGridLinesCount + 1),
  );

  const gridLines = [];
  const gridLabels = [];

  // Add grid lines and labels
  for (let i = 0; i <= horizontalGridLinesCount; i++) {
    const y = netHeight - spaceBetweenHorizontalGridLines * i;

    gridLines.push(
      <Line
        key={`line-${i}`}
        x1={marginLeft}
        y1={y}
        x2={width + marginLeft}
        y2={y}
        stroke={gridColor}
        strokeWidth={gridThickness}
      />
    );

    const labelValue = (minValue + deltaValuesBetweenHorizontalGridLines * i).toFixed(1);

    gridLabels.push(
      <SvgText
        key={`label-${i}`}
        x={labelsMarginLeft}
        y={y + labelsFontSize / 2}
        fill={labelsColor}
        fontSize={labelsFontSize}
        textAnchor="end"
      >
        {`${labelValue} ${unit}`}
      </SvgText>
    );
  }

  const polylinePoints = convertArrayToPolylinePoints();

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Rect
          x="0"
          y="0"
          width={width}
          height={height - marginBottom}
          fill={chartBackground}
        />
        {gridLines}
        {gridLabels}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={lineColor}
          strokeWidth={lineThickness}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Chart;
