import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterTaskPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        //if(!searchText) return [];
        if (searchText == '') {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.task_name.toLowerCase().includes(searchText);
        });
    }
    
}