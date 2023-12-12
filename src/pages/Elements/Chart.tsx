import { useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import IconEye from '../../components/Icon/IconEye';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import { IRootState } from '../../store';
import IconBolt from '../../components/Icon/IconBolt';
import IconNetflix from '../../components/Icon/IconNetflix';
import IconUser from '../../components/Icon/IconUser';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import IconServer from '../../components/Icon/IconServer';
import IconFile from '../../components/Icon/IconFile';
import IconChecks from '../../components/Icon/IconChecks';
import IconMail from '../../components/Icon/IconMail';
import IconPlus from '../../components/Icon/IconPlus';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactApexChart from 'react-apexcharts';

function Chart() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  return (
    <div>
        {/* <div className="panel h-full p-0 lg:col-span-2">
    <div className="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b  border-white-light dark:border-[#1b2e4b]">
        <h5 className="font-semibold text-lg ">Unique Visitors</h5>
        <div className="dropdown">
            <Dropdown
                offset={[0, 5]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="hover:text-primary"
                button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
            >
                <ul>
                    <li>
                        <button type="button">View</button>
                    </li>
                    <li>
                        <button type="button">Update</button>
                    </li>
                    <li>
                        <button type="button">Delete</button>
                    </li>
                </ul>
            </Dropdown>
        </div>
    </div>

    <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" />
</div> */}
</div>
  )
}

export default Chart