import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';

import {roundTo5Minutes, addHours, subtractHours, subtractMinutes,
             momentToDateTimePickerField} from  'shared/utils'

import { EquipmentSelect, ItemTypeSelect } from 'components/Field';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  DateTimePickerField,
  Fab,
  GridContainer,
  GridItem,
  Icon,
  IconButton,
  SelectField,
  TextField,
  Typography,
  ToggleButtonField,
} from '@owl-material';

const FilterForm = ({ closable, closeReport, handleSubmit, loading, t, form, ...props }) => {
  const data = useSelector(state => state.form[form].values);
  const [isExpanded, setIsExpanded] = useState(true);
  const [filters, setFilters] = useState([{}]);

  const removeFilter = (indexFilter) => {
	console.log(indexFilter +' - Before: '+filters);
	let newState = [...filters];
	let clearItemType = 'itemType'+indexFilter
	let clearFilterItemType = 'filterItemType'+indexFilter

	data[clearItemType] = undefined;
	data[clearFilterItemType] = undefined;

	newState.splice(indexFilter, 1);
	return newState;
  }

  useEffect(() => {
    let initialStartDate = {};
    let initialEndDate = {};

    if (! data.startDate) {
      initialStartDate = roundTo5Minutes();
      initialStartDate = subtractMinutes(initialStartDate, 5);
      initialStartDate = subtractHours(initialStartDate, 5);
      data.startDate = momentToDateTimePickerField(initialStartDate);

      initialEndDate = addHours(initialStartDate, 5);
      data.endDate = momentToDateTimePickerField(initialEndDate);
    }
  }, [data])

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <GridContainer>
            <GridItem xs='auto'>
              <IconButton
                size='small'
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Icon>{ isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }</Icon>
              </IconButton>
            </GridItem>
            <GridItem xs>
              <Typography variant='h6'>
                { t('report') }
              </Typography>
            </GridItem>
            { closable &&
              <GridItem xs='auto'>
                <IconButton
                  size='small'
                  onClick={closeReport}
                >
                  <Icon>close</Icon>
                </IconButton>
              </GridItem>
            }
          </GridContainer>
        </CardContent>
        <Collapse in={isExpanded}>
          <CardContent>
            <GridContainer>
              <GridItem xs={12}>
				<Field
                  name='type'
                  component={ToggleButtonField}
                  disabled={loading}
                  onChange={() => {props.change('itemType', null)}}
                  options={[
					{value: 'AdvancedGraphic', label: t('Graphic')},
					{value: 'AdvancedTable', label: t('Table')}
                  ]}
                />
              </GridItem>
              <GridItem xs={12} md={12} lg={3}>
                <Field
                  label={t('equipment')}
                  name='equipment'
                  component={EquipmentSelect}
                  required
                  autoFocus
                  disabled={loading}
                />
              </GridItem>
              <GridItem xs={12} md={4} lg={3}>
                <Field
                  label={t('start date')}
                  name='startDate'
                  component={DateTimePickerField}
                  minutesStep={5}
                  required
                  disabled={loading}
                  disableFuture={true}
                />
              </GridItem>
              <GridItem xs={12} md={4} lg={3}>
                <Field
                  label={t('end date')}
                  name='endDate'
                  component={DateTimePickerField}
                  minutesStep={5}
                  disabled={loading}
                />
              </GridItem>
              { (data.type === 'Graphic' || data.type === 'AdvancedGraphic') &&
                <GridItem xs={12} md={4} lg={3}>
                  <Field
                    label={t('interval')}
                    name='interval'
                    component={SelectField}
                    disabled={loading}
                    options={[
                      {value: '5-minutes', label: t('5 minutes')},
                      {value: '10-minutes', label: t('10 minutes')},
                      {value: '30-minutes', label: t('30 minutes')},
					  {value: '1-hour', label: t('hour')},
					  {value: '3-hour', label: t('3 hours')},
					  {value: '6-hour', label: t('6 hours')},
					  {value: '12-hour', label: t('12 hours')},
                      {value: '1-day', label: t('day')},
                      {value: '1-week', label: t('week')},
                      {value: '1-month', label: t('month')},
                    ]}
                  />
                </GridItem>
              }
            </GridContainer>

			<GridContainer>
				<GridItem  xs={12} md={12} lg={6}>
					<Field
						label={t('show data')}
						name='itemType'
						component={ItemTypeSelect}
						multiple={data.type === 'AdvancedTable'}
						required
						disabled={loading}
					/>
				</GridItem>
			</GridContainer>

			{ (data.type === 'AdvancedTable' || data.type === 'AdvancedGraphic') &&
				filters.map( (filter, index) => (
					<GridContainer key={index}>
						<GridItem  xs={12} md={3} lg={3}>
							<Field
								label={t('item type')}
								name={'itemType'+index}
								component={ItemTypeSelect}
								disabled={loading}
							/>
						</GridItem>
						<GridItem  xs={12} md={9} lg={3}>
							<Field
								label={t('filter')}
								name={'filterItemType'+index}
								component={TextField}
								disabled={loading}
							/>
						</GridItem>
						{index > 0 && filters.length === (index +1) &&
							<GridItem>
								<Fab size='small' color='inherit' disabled={loading} onClick={() => setFilters(removeFilter(index))}>
									<Icon>remove</Icon>
								</Fab>
							</GridItem>
						}
						{filters.length < 4 && filters.length === (index +1) &&
							<GridItem>
								<Fab size='small' color='inherit' disabled={loading} onClick={() => setFilters([...filters, {}])}>
									<Icon>add</Icon>
								</Fab>
							</GridItem>
						}
					</GridContainer>
				))
			}
          </CardContent>
          <CardActions>
            <Button
              color='primary'
              type='submit'
              disabled={loading}
              loading={loading}
            >
              Generate
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </form>
  );
}

export default reduxForm({
  initialValues: {
    type: 'AdvancedGraphic',
    interval: '1-hour',
  },
})(withTranslation('common')(FilterForm));
