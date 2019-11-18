<template>
	<view>
		<demo-block title="选择完整时间">
			<van-datetime-picker type="datetime" data-type="datetime" :loading="loading" :value="currentDate1" :min-date="minDate" @input="onInput" />
		</demo-block>
	
		<demo-block title="选择日期（年月日）">
			<van-datetime-picker type="date" data-type="date" :value="currentDate2" :min-date="minDate" @input="onInput" />
		</demo-block>
	
		<demo-block title="选择日期（年月）">
			<van-datetime-picker type="year-month" data-type="year-month" :value="currentDate3" :min-date="minDate" @input="onInput" />
		</demo-block>
	
	
            <van-datetime-picker title="开始时间" confirm-button-text="确定" type="date" :value="currentDateStart" @confirm="onInputStart" @cancel="offBox" :min-date="minDate + ' '"></van-datetime-picker>

	
		<!-- <van-toast id="van-toast" /> -->
	</view>

</template>

<script>
	import Page from '../../common/page';
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				minHour: 10,
				maxHour: 20,
				// minDate: new Date(2018, 0, 1).getTime(),
				maxDate: new Date(2019, 10, 1).getTime(),
				currentDate1: new Date(2018, 2, 31).getTime(),
				currentDate2: null,
				currentDate3: new Date(2018, 0, 1),
				currentDate4: '12:00',
				loading: false,
				 // vant组件时间戳
				      currentDateStart: new Date().getTime(),
				      currentDateEnd: new Date().getTime(),
				      minDate: new Date(2017, 12, 1).getTime(),
				      startYear: '',
				      //年
				      startMonth: '',
				      //月
				      startDay: '',
				      //日
				      endYear: '',
				      //年
				      endMonth: '',
				      //月
				      endDay: '',
				      //日
				      minDateEnd: new Date(2017, 12, 1).getTime() //开始时间结束时为结束时间可选的最小值
				      ,
				      currentDate: ""
			};
		},
		methods: {
			 setData: function (obj) {
			      let that = this;
			      let keys = [];
			      let val, data;
			      Object.keys(obj).forEach(function (key) {
			        keys = key.split('.');
			        val = obj[key];
			        data = that.$data;
			        keys.forEach(function (key2, index) {
			          if (index + 1 == keys.length) {
			            that.$set(data, key2, val);
			          } else {
			            if (!data[key2]) {
			              that.$set(data, key2, {});
			            }
			          }
			
			          data = data[key2];
			        });
			      });
			    },
			 //vant 确认开始时间
			    onInputStart(event) {
			      let date = event.detail;
			      let year = new Date(date).getFullYear();
			      let month = new Date(date).getMonth();
			      let day = new Date(date).getDate();
			      let endTime = new Date(year, month, day).getTime();
			      this.setData({
			        animate1: 'animated slideOutDown',
			        currentDateStart: event.detail,
			        startYear: new Date(event.detail).getFullYear(),
			        startMonth: new Date(event.detail).getMonth() + 1,
			        startDay: new Date(event.detail).getDate(),
			        minDateEnd: endTime
			      });
			      setTimeout(() => {
			        this.setData({
			          animate2: 'animated slideInUp',
			          startHidePicker: true,
			          endHidePicker: false,
			          animate1: 'animated slideInUp',
			          startTime: `${this.startYear}/${this.startMonth}/${this.startDay}`
			        });
			      }, 650);
			    },
			
			    // vant 确认结束时间
			    onInputEnd(event) {
			      this.setData({
			        animate2: 'animated slideOutDown',
			        currentDate: event.detail,
			        endYear: new Date(event.detail).getFullYear(),
			        endMonth: new Date(event.detail).getMonth() + 1,
			        endDay: new Date(event.detail).getDate(),
			        records: [],
			        currentPage: 1
			      });
			      setTimeout(() => {
			        this.setData({
			          animate2: 'animated slideInUp',
			          endHidePicker: true,
			          endTime: `${this.endYear}/${this.endMonth}/${this.endDay}`
			        });
			        this.getProfit(this.startTime + ' 00:00', this.endTime + ' 23:59');
			      }, 650);
			    },
			
			    // vant 时间选项box
			    offBox() {
			      this.setData({
			        startHidePicker: true,
			        endHidePicker: true
			      });
			    },
			onInput(event) {
				const {
					detail,
					currentTarget
				} = event;
				const result = this.getResult(detail, currentTarget.dataset.type);
				console.log(result)
				console.log(Toast)
				Toast(result);
			},

			getResult(time, type) {
				const date = new Date(time);
				switch (type) {
					case 'datetime':
						return date.toLocaleString();
					case 'date':
						return date.toLocaleDateString();
					case 'year-month':
						return `${date.getFullYear()}/${date.getMonth() + 1}`;
					case 'time':
						return time;
					default:
						return '';
				}
			}
		}
	};
</script>

<style></style>
