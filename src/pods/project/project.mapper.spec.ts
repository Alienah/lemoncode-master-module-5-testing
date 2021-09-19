import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('./pods/project/mapper', () => {
  it('should return a default project with empty values when the provided project is undefined', () => {
    const project = undefined;
    const emptyProject = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(emptyProject);
  });
  it('should return a default project with empty values when the provided project is null', () => {
    const project = null;
    const emptyProject = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(emptyProject);
  });
  it('should return an object with values when a project is provided', () => {
    const project: apiModel.Project = {
      id: '1',
      name: 'Name',
      isActive: true,
      comments: 'Coment',
      externalId: '1234',
      employees: [
        {
          id: '1',
          employeeName: 'Aida',
          isAssigned: true,
        },
      ]
    };
    const projectWithValues: viewModel.Project = {
      id: '1',
      name: 'Name',
      isActive: true,
      comments: 'Coment',
      externalId: '1234',
      employees: [
        {
          id: '1',
          employeeName: 'Aida',
          isAssigned: true,
        },
      ]
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(projectWithValues);
  });
});
