import * as d3 from 'd3';

const colorEmpty = '#e91d62';
const colorFull = '#3e50b4';
let barsWrapper = d3.select('.bars-wrapper');
let height = barsWrapper.node().getBoundingClientRect().height - 10;
let width = barsWrapper.node().getBoundingClientRect().width;
let barsData = [
    {
        name: 'Tom & Jerry',
        readersCurrent: 16,
        readersTotal: 324,
        coverUri: '/static/books-covers/tomandjerry.jpg'
    },
    {
        name: 'Bible',
        readersCurrent: 64,
        readersTotal: 45324,
        coverUri: '/static/books-covers/bible.jpg'
    },
    {
        name: 'Javascript Best Practices',
        readersCurrent: 52,
        readersTotal: 241,
        coverUri: '/static/books-covers/jspractices.jpg'
    },
    {
        name: 'Tom & Jerry',
        readersCurrent: 73,
        readersTotal: 324,
        coverUri: '/static/books-covers/tomandjerry.jpg'
    },
    {
        name: 'Bible',
        readersCurrent: 84,
        readersTotal: 45324,
        coverUri: '/static/books-covers/bible.jpg'
    },
    {
        name: 'Javascript Best Practices',
        readersCurrent: 49,
        readersTotal: 241,
        coverUri: '/static/books-covers/jspractices.jpg'
    }
];
let booksStep = width / barsData.length;

function getPropsArray(data, prop) {
    let arrayOfProps = [];
    data.forEach((item) => {
        arrayOfProps.push(item[prop]);
    });
    return arrayOfProps;
}

let canvas = barsWrapper.append('svg')
    .attr('height', height)
    .attr('width', width);

let currentReaders = getPropsArray(barsData, 'readersCurrent');

let booksBarsRange = d3.scaleLinear()
    .domain(d3.extent(currentReaders))
    .range([d3.min(currentReaders), height - 100]);

let booksBarsColorRange = d3.scaleLinear()
    .domain(d3.extent(currentReaders))
    .range([colorEmpty, colorFull]);

let booksBars = canvas.append('g')
    .attr('class', 'bars-group')
    .selectAll('.book-bar')
    .data(barsData)
    .enter()
    .append('rect')
    .attr('class', 'book-bar')
    .attr('x', (book, index) => {
        return booksStep * index;
    })
    .attr('y', (book) => {
        return height - booksBarsRange(book.readersCurrent);
    })
    .attr('height', (book) => {
        return booksBarsRange(book.readersCurrent);
    })
    .attr('width', 100)
    .attr('fill', (book) => {
        return booksBarsColorRange(book.readersCurrent);
    });

let bookBarsGroup = d3.select('.bars-group');
let bookBarsWidth = bookBarsGroup.node().getBoundingClientRect().width;
let bookBarsOffset = (width - bookBarsWidth) / 2;
bookBarsGroup.attr('transform', `translate( ${bookBarsOffset}, 0)`);
















