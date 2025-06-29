import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificationDTO } from '~root/src/app/core/entities/notification/notification-dto';
import { NotificationService } from '~root/src/app/core/entities/notification/notification.service';
import { getHours } from '~root/src/shared/utils/date-utils';


@Component({
  selector: 'notifications-component',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false,
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public notifications!: NotificationDTO[];
  private pollingIntervalId: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private notificationService: NotificationService) { }

  public ngOnInit() {
    this.startPollingUserNotifications();
  }

  public ngOnDestroy() {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);
    }

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ionViewWillLeave() {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);

      this.pollingIntervalId = null;
    }
  }

  ionViewDidEnter() {
    this.startPollingUserNotifications();
  }

  private async startPollingUserNotifications() {
    if (this.pollingIntervalId) return;

    this.pollingIntervalId = setInterval(() => {
      this.notificationService
        .getAll()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(response => {
          this.notifications = response.data?.contents.map((content: any) => ({
            ...content,
            receivedHour: getHours(content.createdDate)
          }));
        });
    }, 1000);
  }
}