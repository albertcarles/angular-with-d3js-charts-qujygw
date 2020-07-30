import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  constructor () {
  }

  public ngOnInit(): void {
    this.anualBarChart({"target": "#grafica" ,"dataURL":"assets/data/anualconsumption.json"})
  }

 private anualBarChart(a) {
   let showPast = false
    d3.json(a.dataURL, function(b) {
        function c() {
            if (h = parseInt(d3.select(a.target).style("width")) - g.left - g.right, i = parseInt(d3.select(a.target).style("height"), 10) - g.top - g.bottom, 
            k.attr("width", h + g.left + g.right).attr("height", i + g.top + g.bottom), l.range([ 0, h ]).padding(j), 
            m.range([ i, 0 ]), d3.select(a.target + " .axis.x").call(d3.axisBottom().scale(l).ticks(12)).attr("transform", "translate(0, " + i + ")"), 
            d3.select(a.target + " .axis.y").call(d3.axisLeft().scale(m).ticks(5)), showPast) {
                var b = function(a, b) {
                    return d3.area().x(function(a) {
                        return l(a.monthName);
                    }).y0(i).y1(function(a) {
                        return m(b ? a.kWh : 0);
                    }).curve(d3.curveLinear)(a);
                };
                p.attr("d", function(a) {
                    return b(a, !1);
                }).transition().duration(1e3).attr("d", function(a) {
                    return b(a, !0);
                });
            }
            d3.selectAll(a.target + " .current rect").attr("x", function(a, b) {
                return l(a.monthName);
            }).attr("width", l.bandwidth()).attr("y", function(a, b) {
                return m(parseFloat(a.kWh));
            }).attr("height", function(a, b) {
                return i - m(parseFloat(a.kWh));
            });
        }
        function d() {
            if (h = parseInt(d3.select(a.target).style("width")) - g.left - g.right, k.attr("width", h + g.left + g.right), 
            l.range([ 0, h ]).padding(j), m.range([ i, 0 ]), showPast) {
                var b = function(a, b) {
                    return d3.area().x(function(a) {
                        return l(a.monthName);
                    }).y0(i).y1(function(a) {
                        return m(b ? a.kWh : 0);
                    }).curve(d3.curveLinear)(a);
                };
                p.attr("d", function(a) {
                    return b(a, !1);
                }).transition().duration(2e3).attr("d", function(a) {
                    return b(a, !0);
                });
            }
            var c = (q.append("g").classed("axis", !0).classed("x", !0).call(d3.axisBottom().scale(l)).attr("transform", "translate(0, " + i + ")"), 
            q.append("g").classed("axis", !0).classed("y", !0).call(d3.axisLeft().scale(m).ticks(5)).attr("transform", "translate(0, 0)"), 
            r.enter().append("rect").attr("x", function(a, b) {
                return l(a.monthName);
            }).attr("y", i).attr("height", 0).attr("width", l.bandwidth()));
            r.merge(c).transition().delay(function(a, b) {
                return 40 * b;
            }).attr("y", function(a, b) {
                return m(parseFloat(a.kWh));
            }).attr("height", function(a, b) {
                return i - m(parseFloat(a.kWh));
            }).duration(1e3), r.merge(c).exit().remove();
        }
        var e = [], f = [];
        b.current.forEach(function(a, b) {
            e.push({
                monthName: this.getMonthName(a.month).toUpperCase(),
                kWh: a.kWh
            });
        }), void 0 === b.past ? showPast = !1 : b.past.length <= 0 ? (showPast = !1, f = []) : (showPast = !0, 
        b.past.forEach((a, b) => {
            f.push({
                monthName: this.getMonthName(a.month).toUpperCase(),
                kWh: a.kWh
            });
        }));
        var g = {
            top: 10,
            right: 0,
            bottom: 20,
            left: 40
        }, h = parseInt(d3.select(a.target).style("width"), 10) - g.left - g.right, i = parseInt(d3.select(a.target).style("height"), 10) - g.top - g.bottom, j = .3, k = d3.select(a.target).append("svg").attr("height", i + g.top + g.bottom).attr("width", h + g.left + g.right), l = d3.scaleBand().range([ 0, h ]).padding(j), m = d3.scaleLinear().range([ i, 0 ]), n = 0;
        if (showPast) {
            var o = k.append("g").classed("past", !0).attr("transform", "translate(" + g.left + "," + g.top + ")"), p = o.append("path").data([ f ]).classed("area", !0);
            n = d3.max(f, function(a) {
                return a.kWh;
            });
        }
        var q = k.append("g").classed("current", !0).attr("transform", "translate(" + g.left + "," + g.top + ")"), r = q.selectAll("rect").data(e), s = d3.max(e, function(a) {
            return a.kWh;
        });
        showPast ? l.domain(f.map(function(a) {
            return a.monthName;
        })) : l.domain(e.map(function(a) {
            return a.monthName;
        })), m.domain([ 0, n > s ? n : s ]), d();
        //var t = $(window).width();
        //$(window).resize(function() {
        //    $(window).width() != t && (c(), t = $(window).width());
       // });
    });
}

}
