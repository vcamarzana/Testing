import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import {
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from './project.mapper';

describe('mapper employeeSummary specs', () => {
  it.each<apiModel.EmployeeSummary[]>([undefined, null, []])(
    'Should return empty array when feeding %p employeeSumary.',
    (employeeSummary: any) => {
      //Arrange

      //Act
      const result: viewModel.EmployeeSummary[] =
        mapEmployeeSummaryListFromApiToVm(employeeSummary);

      //Assert
      expect(result).toEqual([]);
    }
  );

  it('Should return one item with values when feeding one item with values.', () => {
    //Arrange
    const employeeSummary: apiModel.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'test name',
      },
    ];

    //Act
    const result: viewModel.EmployeeSummary[] =
      mapEmployeeSummaryListFromApiToVm(employeeSummary);
    //Assert
    const expectedResult: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'test name',
      },
    ];
    expect(result).toEqual(expectedResult);
  });
  it('Should return two items with values when feeding two items with values.', () => {
    //Arrange
    const employeeSummary: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'test name1',
      },
      {
        id: '2',
        employeeName: 'test name2',
      },
    ];
    //Act
    const result: viewModel.EmployeeSummary[] =
      mapEmployeeSummaryListFromApiToVm(employeeSummary);
    //Assert
    const expectedResult: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'test name1',
      },
      {
        id: '2',
        employeeName: 'test name2',
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});

describe('mapper project specs', () => {
  it.each<apiModel.Project>([undefined, null])(
    'Should return empty project when feeding %p project.',
    (project: any) => {
      //Arrange

      //Act
      const result: viewModel.Project = mapProjectFromApiToVm(project);
      const expectedResult = viewModel.createEmptyProject();

      //Assert
      expect(result).toEqual(expectedResult);
    }
  );

  it('Should return project.', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test name',
      isActive: false,
      employees: [],
    };
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    const expectedResult: viewModel.Project = {
      id: '1',
      name: 'test name',
      isActive: false,
      employees: [],
    };
    //Assert
    expect(result).toEqual(expectedResult);
  });
});
