import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './tugas.page.html',
  styleUrls: ['./tugas.page.scss'],
})
export class TugasPage implements OnInit {
  dataTugas: any = [];
  id: number | null = null;
  nama_tugas: string = '';
  deskripsi: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.getTugas();
  }

  getTugas() {
    this._apiService.tampil('tampilTugas.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataTugas = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama_tugas = '';
    this.deskripsi = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilTugas(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahTugas() {
    if (this.nama_tugas != '' && this.deskripsi != '') {
      let data = {
        nama_tugas: this.nama_tugas,
        deskripsi: this.deskripsi,
      };
      this._apiService.tambah(data, '/tambahTugas.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah tugas');
          this.getTugas();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah tugas');
        },
      });
    } else {
      console.log('gagal tambah tugas karena masih ada data yg kosong');
    }
  }

  hapusTugas(id: any) {
    this._apiService.hapus(id, '/hapusTugas.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getTugas();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilTugas(id: any) {
    this._apiService.lihat(id, '/lihatTugas.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let tugas = hasil;
        this.id = tugas.id;
        this.nama_tugas = tugas.nama_tugas;
        this.deskripsi = tugas.deskripsi;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editTugas() {
    let data = {
      id: this.id,
      nama_tugas: this.nama_tugas,
      deskripsi: this.deskripsi,
    };
    this._apiService.edit(data, '/editTugas.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getTugas();
        console.log('berhasil edit tugas');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit tugas');
      },
    });
  }
}

