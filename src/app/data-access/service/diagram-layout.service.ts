import {Injectable} from '@angular/core';

const PREFIX = 'DiagramLayoutService.';


@Injectable({
  providedIn: 'root'
})
export class DiagramLayoutService {

  align: string;
  alignValues = ['UL', 'UR', 'DL', 'DR'];

  rankdir: string;
  rankdirValues = ['TB', 'BT', 'LR', 'RL'];

  ranker: string;
  rankerValues = ['network-simplex', 'tight-tree', 'longest-path'];

  /* TODO: later
  nodesep: number;
  edgesep: number;
  ranksep: number;
  marginx: number;
  marginy: number;
   */

  constructor() {
    this.init();
  }

  public init(): void {
    this.align = this.getString('align', 'DR');
    this.rankdir = this.getString('rankdir', 'TB');
    this.ranker = this.getString('ranker', 'network-simplex');
  }

  protected getString(key: string, defaultValue?: string): string {
    const val = localStorage.getItem(PREFIX + key);
    return val ? val : defaultValue;
  }

  protected changeValue(key: string, value: string, values: string[]): string {
    const currentIndex = values.indexOf(value);
    const nextIndex = currentIndex >= values.length - 1 ? 0 : currentIndex + 1;
    const nextValue = values[nextIndex];
    localStorage.setItem(PREFIX + key, nextValue);
    return nextValue;
  }

  public changeAlign(): void {
    this.align = this.changeValue('align', this.align, this.alignValues);
  }

  public changeRankdir(): void {
    this.rankdir = this.changeValue('rankdir', this.rankdir, this.rankdirValues);
  }

  public changeRanker(): void {
    this.ranker = this.changeValue('ranker', this.ranker, this.rankerValues);
  }


}
