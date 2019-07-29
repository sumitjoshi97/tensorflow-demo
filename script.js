async function getData() {
  const carsDataReq = await fetch(
    'https://storage.googleapis.com/tfjs-tutorials/carsData.json'
  )
  const carsData = await carsDataReq.json()
  console.log(carsData)
  const cleaned = carsData
    .map(car => ({
      mpg: car.Miles_per_Gallon,
      horsePower: car.Horsepower,
    }))
    .filter(car => car.mpg !== null && car.horsePower !== null)

  return cleaned
}

async function run() {
  const data = await getData()
  console.log(data)
  const values = await data.map(d => ({
    x: d.horsePower,
    y: d.mpg,
  }))

  console.log(values)
  tfvis.render.scatterplot(
    { name: 'Horsepower v MPG' },
    { values },
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300,
    }
  )
}

document.addEventListener('DOMContentLoaded', run)
