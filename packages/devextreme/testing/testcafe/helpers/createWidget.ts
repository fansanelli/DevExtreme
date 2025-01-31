import { ClientFunction } from 'testcafe';
import type { Properties as DataGridProperties } from '../../../js/ui/data_grid';
import type { Properties as FilterBuilderProperties } from '../../../js/ui/filter_builder';

export type WidgetName =
'dxAccordion'
| 'dxAutocomplete'
| 'dxGallery'
| 'dxButtonGroup'
| 'dxCalendar'
| 'dxCalendarView'
| 'dxCheckBox'
| 'dxColorBox'
| 'dxDropDownButton'
| 'dxDraggable'
| 'dxTabPanel'
| 'dxForm'
| 'dxFilterBuilder'
| 'dxSelectBox'
| 'dxScrollable'
| 'dxScrollView'
| 'dxMultiView'
| 'dxPivotGrid'
| 'dxPivotGridFieldChooser'
| 'dxDataGrid'
| 'dxTreeList'
| 'dxPager'
| 'dxRadioGroup'
| 'dxScheduler'
| 'dxTabs'
| 'dxTagBox'
| 'dxContextMenu'
| 'dxDropDownMenu'
| 'dxChart'
| 'dxMenu'
| 'dxPopup'
| 'dxPopover'
| 'dxSpeedDialAction'
| 'dxSortable'
| 'dxButton'
| 'dxTextBox'
| 'dxTextArea'
| 'dxToolbar'
| 'dxTreeView'
| 'dxDateBox'
| 'dxDateRangeBox'
| 'dxLookup'
| 'dxOverlay'
| 'dxList'
| 'dxHtmlEditor'
| 'dxNumberBox'
| 'dxValidator'
| 'dxFileUploader'
| 'dxSlider'
| 'dxDropDownBox'
| 'dxFileManager'
| 'dxSwitch';

interface WidgetOptions {
  dxDataGrid: DataGridProperties;
  dxFilterBuilder: FilterBuilderProperties;
  // todo write other widgets
}

export default async function createWidget<TWidgetName extends WidgetName>(
  componentName: TWidgetName,
  componentOptions: TWidgetName extends keyof WidgetOptions
    ? WidgetOptions[TWidgetName] | (() => WidgetOptions[TWidgetName])
    : unknown,
  selector = '#container',
  options: {
    disableFxAnimation: boolean;
  } = {
    disableFxAnimation: true,
  },
): Promise<void> {
  await ClientFunction(() => {
    (window as any).DevExpress.fx.off = options.disableFxAnimation;
  }, {
    dependencies: {
      options,
    },
  })();

  await ClientFunction(
    () => {
      const widgetOptions = typeof componentOptions === 'function' ? componentOptions() : componentOptions;
      (window as any).widget = ($(`${selector}`) as any)[componentName](widgetOptions)[componentName]('instance');
    },
    {
      dependencies: {
        componentName,
        componentOptions,
        selector,
      },
    },
  )();
}
